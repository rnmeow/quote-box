import chalk from 'chalk'
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
  info: chalk.bold.bgBlueBright('INFO'),
  fatal: chalk.bold.bgRedBright('FATL'),
}

;(async () => {
  const quotableUrl = new URL('https://api.quotable.io/quotes/random')

  quotableUrl.searchParams.set('limit', '1')
  conf.tags && quotableUrl.searchParams.set('tags', conf.tags)
  conf.minLength && quotableUrl.searchParams.set('minLength', conf.minLength)
  conf.maxLength && quotableUrl.searchParams.set('maxLength', conf.maxLength)

  console.log(logTypes.info, `Fetching ${quotableUrl.toString()} …`)

  const dat: Quot[] = await fetch(quotableUrl)
    .then((resp) => resp.json())
    .catch((err) => {
      console.error(logTypes.fatal, `${err}`)

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
    console.error(logTypes.fatal, `${err}`)

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
      console.error(logTypes.fatal, `${err}`)

      process.exit(1)
    })
})()
