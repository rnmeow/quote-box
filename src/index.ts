import { join } from 'path'
import { writeFile } from 'fs/promises'

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

try {
  await writeFile(join(process.cwd(), 'quote.txt'), content)
} catch (err) {
  console.error(`FATAL: ${err}`)
  process.exit(1)
}

console.log('INFO: 成功儲存。\n')
