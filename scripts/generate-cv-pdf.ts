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
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; font-size: 10pt; line-height: 1.4; padding: 28px 40px; }
    h1 { font-size: 20pt; color: #c2410c; margin-bottom: 2px; }
    h2 { font-size: 11.5pt; color: #c2410c; border-bottom: 2px solid #c2410c; padding-bottom: 3px; margin: 14px 0 7px; text-transform: uppercase; letter-spacing: 0.4px; }
    .subtitle { font-size: 11pt; color: #555; margin-bottom: 4px; }
    .contact { font-size: 9pt; color: #444; margin-bottom: 10px; }
    .contact a { color: #c2410c; text-decoration: none; }
    .bio { margin-bottom: 4px; color: #333; font-size: 10pt; }
    .entry { margin-bottom: 8px; }
    .entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
    .entry-title { font-weight: 700; font-size: 10.5pt; }
    .entry-date { font-size: 9pt; color: #666; white-space: nowrap; }
    .entry-sub { font-size: 9.5pt; color: #555; font-style: italic; }
    .entry p, .entry li { font-size: 9.5pt; margin-top: 1px; }
    .entry ul { margin: 2px 0 0 16px; }
    .skills { margin-top: 2px; }
    .skills li { margin-left: 16px; font-size: 9.5pt; }
    .techs { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px; }
    .skill { background: #fed7aa; color: #9a3412; padding: 1px 8px; border-radius: 10px; font-size: 8pt; font-weight: 600; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 18px; }
    .cert-item { font-size: 9.5pt; }
    .cert-item strong { font-weight: 600; }
    .cert-meta { font-size: 8.5pt; color: #666; }
  </style>
</head>
<body>
  <h1>${persona.nombre}</h1>
  <div class="subtitle">${persona.titulo}</div>
  <div class="contact">
    ${persona.ubicacion} · ${persona.telefono} ·
    <a href="mailto:${persona.email}">${persona.email}</a><br>
    <a href="${persona.github}">GitHub</a> ·
    <a href="${persona.linkedin}">LinkedIn</a> ·
    <a href="${persona.portfolio}">Portfolio</a>
  </div>

  <h2>Perfil profesional</h2>
  <div class="bio">${perfil}</div>

  <h2>Experiencia profesional</h2>
  ${experiencia.map(e => `
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${e.puesto} — ${e.empresa}</span>
      <span class="entry-date">${e.fecha}</span>
    </div>
    <ul>${e.puntos.map(p => `<li>${p}</li>`).join('')}</ul>
  </div>`).join('')}

  <h2>Formación académica</h2>
  ${formacion.map(f => `
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${f.nombre}</span>
      <span class="entry-date">${f.fecha}</span>
    </div>
    ${f.centro ? `<div class="entry-sub">${f.centro}</div>` : ''}
    ${f.detalle ? `<p>${f.detalle}</p>` : ''}
  </div>`).join('')}

  <h2>Formación complementaria</h2>
  <div class="two-col">
    ${cursos.map(c => `
    <div class="cert-item">
      <strong>${c.nombre}</strong>
      ${c.extra ? `<div class="cert-meta">${c.extra}</div>` : ''}
    </div>`).join('')}
  </div>

  ${allProjects.length ? `
  <h2>Proyectos</h2>
  ${allProjects.map(p => `
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${p.nombre}</span>
      <span class="entry-date">${p.año || ''}</span>
    </div>
    <p>${p.descripcion || ''}${p.url ? ` — <a href="${p.url}" style="color:#c2410c;text-decoration:none;font-size:9pt">Ver</a>` : ''}</p>
  </div>`).join('')}` : ''}

  <h2>Habilidades</h2>
  <ul class="skills">
    ${habilidades.map(h => `<li>${h}</li>`).join('')}
  </ul>
  <div class="techs">
    ${techs.map(t => `<span class="skill">${t}</span>`).join('')}
  </div>
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
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
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
