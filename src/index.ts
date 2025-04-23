import { readFile } from 'node:fs/promises'

import { request } from '@octokit/request'
import { getInput } from '@actions/core'
import { type } from 'arktype'
import { join } from 'path'

type Config = typeof confVal.infer

const confVal = type({
  // API
  'apiUrl': 'string',
  'searchParams?': 'Record<string, string>',
  'authorKey': 'string',
  'contentKey': 'string',

  // GitHub
  'gistId': 'string',
  'gistFileName': 'string',

  // Formatting
  'timeZone?': 'string',
})

const logTypes = {
  info: `\x1b[44mINFO\x1b[0m`,
  fatl: `\x1b[41mFATL\x1b[0m`,
}

const getValueFromPath = (obj: Object, path: string) =>
  path.split('.').reduce((acc, part) => acc?.[part], obj)

function splitByWordBoundary(text: string, maxLength = 50) {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (let word of words) {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word
    } else {
      lines.push(currentLine)

      currentLine = word
    }
  }

  if (currentLine) lines.push(currentLine)

  return lines
}

async function loadConfig(confFilePath: string): Promise<Config> {
  const confFile = join(process.cwd(), confFilePath)

  const conf = await readFile(confFile)
    .then((buf) => buf.toString('utf-8'))
    .then((text) => JSON.parse(text))

  return conf satisfies Config
}

;(async () => {
  const conf = confVal(await loadConfig(getInput('confFile')))

  if (conf instanceof type.errors) {
    console.error(logTypes.fatl, conf.summary)

    process.exit(1)
  }

  const apiUrl = new URL(conf.apiUrl)

  conf.searchParams &&
    Object.entries(conf.searchParams).forEach(([key, value]) => {
      apiUrl.searchParams.set(key, value)
    })

  console.log(logTypes.info, `Fetching ${apiUrl.toString()} …`)

  const data: Object = await fetch(apiUrl, {
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

  const content = `“${splitByWordBoundary(getValueFromPath(data, conf.contentKey) as string).join('\n')}”
— ${getValueFromPath(data, conf.authorKey)}

Updated ${new Intl.DateTimeFormat('en-IE', {
    timeZone: conf.timeZone || 'Asia/Taipei',
    dateStyle: 'medium',
    timeStyle: 'long',
  }).format(new Date())}`

  console.log(`\n${content}\n`)

  const gist = await request('GET /gists/:gist_id', {
    gist_id: conf.gistId,
    headers: {
      authorization: `token ${process.env.GH_TOKEN!}`,
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
