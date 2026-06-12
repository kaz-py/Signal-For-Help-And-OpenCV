// Verificación de animaciones de scroll: recorre la página con un Chrome real,
// captura el morph del gesto en varios puntos y las secciones animadas.
// Uso: node scripts/verify-scroll.mjs
import puppeteer from 'puppeteer-core'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = tmpdir()
const shot = (page, name) => page.screenshot({ path: join(OUT, `vs-${name}.png`) })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--autoplay-policy=no-user-gesture-required'],
  defaultViewport: { width: 1366, height: 850 },
})

const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })

await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 })

// Posición del scrollytelling
const gs = await page.evaluate(() => {
  const el = document.querySelector('.gs-wrap')
  const r = el.getBoundingClientRect()
  return { top: r.top + window.scrollY, height: r.height, vh: innerHeight }
})

// El progreso va de (top alcanza viewport-top) a (bottom alcanza viewport-bottom)
const span = gs.height - gs.vh
for (const [name, frac] of [['gesto-0', 0.04], ['gesto-1', 0.5], ['gesto-2', 0.96]]) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), gs.top + span * frac)
  await new Promise((r) => setTimeout(r, 700))
  await shot(page, name)
}

for (const sel of ['#ingenieria', '#investigacion', '#galeria', '#repositorios', '#unae']) {
  await page.evaluate((s) => document.querySelector(s).scrollIntoView({ behavior: 'instant', block: 'start' }), sel)
  await new Promise((r) => setTimeout(r, 1300))
  await shot(page, sel.slice(1))
}

console.log('Errores JS:', errors.length ? errors : 'ninguno')
await browser.close()
console.log('Capturas en', OUT)
