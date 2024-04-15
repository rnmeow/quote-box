import { request } from '@octokit/request'
import { getInput } from '@actions/core'

export interface Resp {
  id: number
  category: number
  cite: string
  author: string
  sentence: string
}

const data: Resp = await fetch('https://v0.elegant.tw/all').then((res) =>
  res.json(),
)

const content = `${data.sentence}
 ——${data.author !== null ? data.author : data.cite}

於 ${new Date().toLocaleString('zh-TW', {
  timeZone: 'Asia/Taipei',
  hourCycle: 'h23',
})} 更新`

console.log(`\n${content}\n`)

const conf = {
  token: getInput('token', { required: true }),
  gistId: getInput('gist_id', { required: true }),
  gistFileName: getInput('gist_file_name', { required: true }),
}

const gist = await request('GET /gists/:gist_id', {
  gist_id: conf.gistId,
  headers: {
    authorization: `token ${conf.token}`,
  },
})

const filename = Object.keys(gist.data.files)[0]

request('PATCH /gists/:gist_id', {
  files: {
    [filename]: {
      filename: conf.gistFileName,
      content,
    },
  },
  gist_id: conf.gistId,
  headers: {
    authorization: `token ${conf.token}`,
  },
}).then(() => {
  console.log('GitHub Gist 更新完成！')
}).catch((err) => {
  console.error(err)

  process.exit(1)
})
