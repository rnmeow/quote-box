import { request } from '@octokit/request'
import { getInput } from '@actions/core'
import { z } from 'zod'
import { join } from 'path'
import { readFile } from 'fs/promises'

type Config = z.infer<typeof ConfigSchema>

const ConfigSchema = z.object({
  // API
  apiUrl: z.string(),
  searchParams: z.record(z.string()).optional(),
  returnsArr: z.boolean().optional(),
  authorKey: z.string(),
  contentKey: z.string(),

  // GitHub
  token: z.string(),
  gistId: z.string(),
  gistFileName: z.string(),

  // Formatting
  timeZone: z.string(),
})

const logTypes = {
  info: `\x1b[44mINFO\x1b[0m`,
  fatl: `\x1b[41mFATL\x1b[0m`,
}

async function loadConfig(confFilePath: string): Promise<Config> {
  const confFile = join(process.cwd(), confFilePath)

  const conf = await readFile(confFile)
    .then((buf) => buf.toString('utf-8'))
    .then((text) => JSON.parse(text))

  return conf satisfies Config
}

;(async () => {
  const conf = await loadConfig(getInput('confFile'))

  try {
    ConfigSchema.parse(conf)
  } catch (err) {
    console.error(logTypes.fatl, err)

    process.exit(1)
  }

  const apiUrl = new URL(conf.apiUrl)

  conf.searchParams &&
    Object.entries(conf.searchParams).forEach(([key, value]) => {
      apiUrl.searchParams.set(key, value)
    })

  console.log(logTypes.info, `Fetching ${apiUrl.toString()} …`)

  let data: any = await fetch(apiUrl, {
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

  data = conf.returnsArr ? data : data[0]

  const content = `“${data[conf.contentKey]}”
— ${data[conf.authorKey]}

Updated ${new Intl.DateTimeFormat('en-IE', {
    timeZone: conf.timeZone || 'Asia/Taipei',
    dateStyle: 'medium',
    timeStyle: 'long',
  }).format(new Date())}`

  console.log(`\n${content}\n`)

  const gist = await request('GET /gists/:gist_id', {
    gist_id: conf.gistId,
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
        filename: conf.gistFileName,
        content,
      },
    },
    gist_id: conf.gistId,
    headers: {
      authorization: `token ${process.env.GH_TOKEN!}`,
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
