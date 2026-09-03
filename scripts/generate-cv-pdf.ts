/**
 * Generates CV PDF from the static CV base + synced Drive/GitHub data.
 * Base content is never deleted. New courses and projects are appended.
 * Output: public/cv/CV Valen {YEAR}.pdf
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  persona,
  perfil,
  experiencia,
  formacionBase,
  cursosComplementarios,
  habilidades,
  tecnologiasBase,
} from '../src/data/cv-base'
import { proyectos } from '../src/data/proyectos'
import { githubProjects } from '../src/data/github-projects'
import { certificados } from '../src/data/certificados'
import { titulos } from '../src/data/titulos'
import { proyectosOcultos } from '../src/data/proyectos-ocultos'

const YEAR = new Date().getFullYear()
const PDF_NAME = `CV Valen ${YEAR}.pdf`
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'cv')
const OUTPUT_PATH = path.join(OUTPUT_DIR, PDF_NAME)

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function normalize(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9áéíóúñ]/gi, '')
}

function isSimilar(a: string, b: string) {
  const na = normalize(a)
  const nb = normalize(b)
  return na === nb || na.includes(nb) || nb.includes(na)
}

function generateHTML(): string {
  const hiddenNames = new Set(proyectosOcultos.map(normalize))
  const manualNames = new Set(proyectos.map(p => normalize(p.nombre)))
  const manualUrls = new Set(proyectos.map(p => p.url).filter(Boolean).map(u => u.toLowerCase()))

  const allProjects = [
    ...proyectos,
    ...githubProjects.filter(p => {
      const name = normalize(p.nombre || '')
      if (hiddenNames.has(name)) return false
      if ([...manualNames].some(m => isSimilar(m, name))) return false
      if (p.url && manualUrls.has(p.url.toLowerCase())) return false
      return true
    }),
  ]

  const formacion = [...formacionBase]
  for (const t of titulos) {
    if (formacion.some(f => isSimilar(f.nombre, t.nombre))) continue
    formacion.push({
      nombre: t.nombre,
      centro: t.centro,
      fecha: t.fecha,
    })
  }

  const cursos = [
    ...cursosComplementarios.map(c => ({
      nombre: c.nombre,
      extra: c.duracion,
    })),
  ]
  for (const c of certificados) {
    if (cursos.some(x => isSimilar(x.nombre, c.nombre))) continue
    if (formacion.some(f => isSimilar(f.nombre, c.nombre))) continue
    cursos.push({
      nombre: c.nombre,
      extra: [c.emisor, c.fecha].filter(Boolean).join(' · '),
    })
  }

  const techs = [...new Set([
    ...tecnologiasBase,
    ...allProjects.flatMap(p => p.tecnologias || []),
  ])]

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #222;
      font-size: 10.5pt;
      line-height: 1.45;
    }
    h1 {
      font-size: 20pt;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 0.2px;
      margin-bottom: 2px;
    }
    .subtitle {
      font-size: 11.5pt;
      color: #c2410c;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .contact { font-size: 9.5pt; color: #333; line-height: 1.55; margin-bottom: 4px; }
    h2 {
      font-size: 11pt;
      font-weight: 700;
      color: #1a1a1a;
      border-bottom: 1.5px solid #c2410c;
      padding-bottom: 3px;
      margin: 13px 0 7px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }
    .bio { color: #333; font-size: 10.5pt; }
    .entry { margin-bottom: 8px; }
    .entry-title { font-weight: 700; font-size: 10.5pt; }
    .entry-date { color: #444; }
    .entry-sub { font-size: 10pt; color: #444; }
    .entry p, .entry li { font-size: 10pt; color: #333; }
    .entry ul { margin: 2px 0 0 18px; }
    .skills { margin-left: 18px; }
    .skills li { font-size: 10pt; color: #333; }
    .techs { margin-top: 6px; font-size: 10pt; color: #333; }
    .curso { font-size: 10pt; margin-bottom: 3px; color: #333; }
  </style>
</head>
<body>
  <h1>${persona.nombre}</h1>
  <p class="subtitle">${persona.titulo}</p>
  <p class="contact">
    ${persona.ubicacion} · ${persona.telefono} · ${persona.email}<br>
    GitHub: ${persona.github}<br>
    LinkedIn: ${persona.linkedin}<br>
    Portfolio: ${persona.portfolio}
  </p>

  <h2>Perfil profesional</h2>
  <p class="bio">${perfil}</p>

  <h2>Experiencia profesional</h2>
  ${experiencia.map(e => `
  <div class="entry">
    <p><span class="entry-title">${e.puesto} — ${e.empresa}</span> | <span class="entry-date">${e.fecha}</span></p>
    <ul>${e.puntos.map(p => `<li>${p}</li>`).join('')}</ul>
  </div>`).join('')}

  <h2>Formación académica</h2>
  ${formacion.map(f => `
  <div class="entry">
    <p><span class="entry-title">${f.nombre}</span> | <span class="entry-date">${f.fecha}</span></p>
    ${f.centro ? `<p class="entry-sub">${f.centro}</p>` : ''}
    ${f.detalle ? `<p>${f.detalle}</p>` : ''}
  </div>`).join('')}

  <h2>Formación complementaria</h2>
  ${cursos.map(c => `
  <p class="curso">${c.nombre}${c.extra ? ` (${c.extra})` : ''}</p>`).join('')}

  ${allProjects.length ? `
  <h2>Proyectos</h2>
  ${allProjects.map(p => `
  <div class="entry">
    <p><span class="entry-title">${p.nombre}</span>${p.año ? ` | <span class="entry-date">${p.año}</span>` : ''}</p>
    <p>${p.descripcion || ''}${p.url ? ` ${p.url}` : ''}</p>
  </div>`).join('')}` : ''}

  <h2>Habilidades</h2>
  <ul class="skills">
    ${habilidades.map(h => `<li>${h}</li>`).join('')}
  </ul>
  <p class="techs">${techs.join(' · ')}</p>
</body>
</html>`
}

async function generatePDF() {
  console.log(`📄 Generating ${PDF_NAME}...`)

  const html = generateHTML()
  ensureDir(OUTPUT_DIR)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'cv-preview.html'), html, 'utf-8')

  try {
    const puppeteer = await import('puppeteer-core')
    let executablePath: string | undefined

    if (process.env.CI) {
      const chromium = await import('@sparticuz/chromium-min')
      executablePath = await (chromium.default as any).executablePath(
        'https://github.com/nicedoc/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
      )
    } else {
      const paths = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      ]
      executablePath = paths.find(p => fs.existsSync(p))
    }

    if (!executablePath) {
      console.log('⚠️  Chrome not found. HTML preview saved.')
      return
    }

    const browser = await puppeteer.default.launch({
      headless: true,
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'load' })

    await page.pdf({
      path: OUTPUT_PATH,
      format: 'A4',
      margin: { top: '18mm', right: '16mm', bottom: '18mm', left: '16mm' },
      printBackground: false,
    })

    await browser.close()
    console.log(`✅ Saved: ${OUTPUT_PATH}`)
  } catch (err) {
    console.log('⚠️  PDF generation failed:', (err as Error).message)
    console.log('   HTML preview saved at: public/cv/cv-preview.html')
  }
}

generatePDF().catch(err => {
  console.error('❌ Failed:', err)
  process.exit(1)
})
