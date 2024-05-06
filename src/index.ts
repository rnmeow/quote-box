import { request } from '@octokit/request'
import { getInput } from '@actions/core'

export interface Quot {
  _id: string
  content: string
  author: string
  authorSlug: string
  length: number
  tags: string[]
}

const conf = {
  tags: getInput('tags'),
  minLength: getInput('min_length'),
  maxLength: getInput('max_length'),
  timeZone: getInput('time_zone'),

  token: process.env.GH_TOKEN!,
  gistId: getInput('gist_id', { required: true }),
  gistFileName: getInput('gist_file_name', { required: true }),
}

const logTypes = {
  info: `\x1b[44mINFO\x1b[0m`,
  fatl: `\x1b[41mFATL\x1b[0m`,
}

;(async () => {
  const quotableUrl = new URL('https://api.quotable.io/quotes/random')

  quotableUrl.searchParams.set('limit', '1')
  conf.tags && quotableUrl.searchParams.set('tags', conf.tags)
  conf.minLength && quotableUrl.searchParams.set('minLength', conf.minLength)
  conf.maxLength && quotableUrl.searchParams.set('maxLength', conf.maxLength)

  console.log(logTypes.info, `Fetching ${quotableUrl.toString()} …`)

  const dat: Quot[] = await fetch(quotableUrl, {
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0) Gecko/20100101 Firefox/115.0',
    },
  })
    .then((resp) => resp.json())
    .catch((err) => {
      console.error(logTypes.fatl, err)

      process.exit(1)
    })

  const quot = dat[0]
  const content = `“${quot.content}”
— ${quot.author}

Updated at ${new Intl.DateTimeFormat('en-IE', {
    dateStyle: 'medium',
    timeStyle: 'long',
  }).format(new Date())}`

  console.log(`\n${content}\n`)

  const gist = await request('GET /gists/:gist_id', {
    gist_id: conf.gistId || undefined,
    headers: {
      authorization: `token ${conf.token}`,
    },
  }).catch((err) => {
    console.error(logTypes.fatl, err)

    process.exit(1)
  })

  const filename = Object.keys(gist.data.files)[0]

  request('PATCH /gists/:gist_id', {
    files: {
      [filename]: {
        filename: conf.gistFileName || undefined,
        content,
      },
    },
    gist_id: conf.gistId || undefined,
    headers: {
      authorization: `token ${conf.token}`,
    },
  })
    .then(() => {
      console.log(logTypes.info, 'The Gist was updated successfully!')
    })
    .catch((err) => {
      console.error(logTypes.fatl, err)

      process.exit(1)
    })
})()
