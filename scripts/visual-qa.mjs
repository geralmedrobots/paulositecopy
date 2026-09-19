import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'
import { pageIds, pagePath } from '../src/data/routes.js'
const root = 'artifacts/visual'
await fs.mkdir(root, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage()
const records = []
for (const lang of ['en', 'pt']) for (const width of [375, 1440]) {
  await page.setViewportSize({ width, height: 900 })
  for (const id of pageIds) {
    await page.goto('http://127.0.0.1:4173' + pagePath(id, lang))
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(async i => { i.loading = 'eager'; await i.decode().catch(() => {}) })) })
    const name = `${lang}-${id}-${width}.png`
    await page.screenshot({ path: `${root}/${name}`, fullPage: true })
    records.push({ id, lang, width, file: name })
  }
}
await fs.writeFile(`${root}/index.html`, `<!doctype html><html lang="en"><title>Med Robots — visual QA</title><meta name="viewport" content="width=device-width"><style>body{font:16px system-ui;margin:2rem}section{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}img{width:100%;height:400px;object-fit:contain;object-position:top}a{display:block;padding:1rem;border:1px solid #ddd}</style><h1>Med Robots — desktop and mobile</h1><section>${records.map(r=>`<a href="${r.file}">${r.lang} / ${r.id} / ${r.width}px<img src="${r.file}" alt="${r.id} ${r.lang} ${r.width}px"></a>`).join('')}</section></html>`)
await browser.close()
console.log(`Saved ${records.length} full-page screenshots to ${root}.`)
