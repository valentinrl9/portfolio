/**
 * Generates CV PDF from existing data files.
 * Output: public/cv/CV Valen {YEAR}.pdf
 *
 * Reads src/data/ files directly — no Sheet needed.
 */

import * as fs from 'fs'
import * as path from 'path'

const DATA_DIR = path.join(__dirname, '..', 'src', 'data')
const YEAR = new Date().getFullYear()
const PDF_NAME = `CV Valen ${YEAR}.pdf`
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'cv')
const OUTPUT_PATH = path.join(OUTPUT_DIR, PDF_NAME)

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function tryReadExport<T>(filename: string): T[] {
  const filepath = path.join(DATA_DIR, filename)
  if (!fs.existsSync(filepath)) return []
  const content = fs.readFileSync(filepath, 'utf-8')
  const match = content.match(/:\s*\w+\[\]\s*=\s*(\[[\s\S]*?\]);?\s*$/)
  if (match) {
    try { return JSON.parse(match[1]) } catch { /* skip */ }
  }
  return []
}

// Read all data
interface Proyecto { nombre: string; año: number; tecnologias: string[]; descripcion: string; url: string }
interface Certificado { nombre: string; emisor: string; fecha: string }
interface Titulo { nombre: string; centro: string; fecha: string }

function generateHTML(): string {
  const proyectos = tryReadExport<Proyecto>('proyectos.ts')
  const githubProjects = tryReadExport<Proyecto>('github-projects.ts')
  const certificados = tryReadExport<Certificado>('certificados.ts')
  const titulos = tryReadExport<Titulo>('titulos.ts')
  const hidden = tryReadExport<string>('proyectos-ocultos.ts')
  const hiddenNames = new Set(
    (hidden.length ? hidden : ['AgroPlaga AI', 'Proyecto Agro Data Consulting', 'EliGRNails', 'Portfolio', 'ABN'])
      .map(n => n.toLowerCase().replace(/[^a-z0-9]/g, ''))
  )
  const normalize = (n: string) => n.toLowerCase().replace(/[^a-z0-9]/g, '')
  const manualNames = new Set(proyectos.map(p => normalize(p.nombre)))
  const manualUrls = new Set(proyectos.map(p => p.url).filter(Boolean).map(u => u.toLowerCase()))

  // Combine manual + github projects, sorted by year desc
  const allProjects = [
    ...proyectos,
    ...githubProjects.filter(p => {
      const name = normalize(p.nombre || '')
      if (hiddenNames.has(name)) return false
      if (manualNames.has(name)) return false
      if (p.url && manualUrls.has(p.url.toLowerCase())) return false
      return true
    }),
  ]
    .filter(p => !hiddenNames.has(normalize(p.nombre || '')))
    .sort((a, b) => (b.año || 0) - (a.año || 0))
    .slice(0, 8) // Top 8 for the CV

  // Collect all unique technologies
  const allTechs = [...new Set(allProjects.flatMap(p => p.tecnologias || []))]
  const certUnicos = [...new Map(certificados.map(c => [c.nombre, c])).values()]

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; font-size: 10.5pt; line-height: 1.45; padding: 36px 44px; }
    h1 { font-size: 22pt; color: #c2410c; margin-bottom: 2px; }
    h2 { font-size: 12pt; color: #c2410c; border-bottom: 2px solid #c2410c; padding-bottom: 3px; margin: 16px 0 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .subtitle { font-size: 11pt; color: #555; margin-bottom: 6px; }
    .contact { font-size: 9pt; color: #666; margin-bottom: 14px; }
    .contact a { color: #c2410c; text-decoration: none; }
    .bio { margin-bottom: 14px; color: #333; font-size: 10pt; }
    .entry { margin-bottom: 10px; }
    .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
    .entry-title { font-weight: 700; font-size: 10.5pt; }
    .entry-date { font-size: 9pt; color: #888; }
    .entry-sub { font-size: 9.5pt; color: #555; font-style: italic; }
    .entry p { font-size: 10pt; margin-top: 2px; }
    .skills { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
    .skill { background: #fed7aa; color: #9a3412; padding: 1px 9px; border-radius: 10px; font-size: 8.5pt; font-weight: 600; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; }
    .cert-item, .title-item { font-size: 10pt; margin-bottom: 4px; }
    .cert-item strong, .title-item strong { font-weight: 600; }
    .cert-meta { font-size: 9pt; color: #666; }
  </style>
</head>
<body>
  <h1>Valentín Ruiz León</h1>
  <div class="subtitle">Desarrollador Web FullStack</div>
  <div class="contact">
    <a href="https://www.linkedin.com/in/valentin-ruiz-823b31286">LinkedIn</a> ·
    <a href="https://github.com/valentinrl9">GitHub</a>
  </div>

  <div class="bio">
    Profesional multidisciplinar con más de 25 años de trayectoria. Desarrollador FullStack con experiencia en React, Angular, Symfony, Node.js y más. Apasionado por transformar ideas en soluciones eficientes.
  </div>

  ${titulos.length ? `
  <h2>Formación</h2>
  ${titulos.map(t => `
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${t.nombre}</span>
      <span class="entry-date">${t.fecha}</span>
    </div>
    ${t.centro ? `<div class="entry-sub">${t.centro}</div>` : ''}
  </div>`).join('')}` : ''}

  ${allProjects.length ? `
  <h2>Proyectos destacados</h2>
  ${allProjects.map(p => `
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">${p.nombre}</span>
      <span class="entry-date">${p.año || ''}</span>
    </div>
    <p>${p.descripcion || ''}${p.url ? ` — <a href="${p.url}" style="color:#c2410c;text-decoration:none;font-size:9pt">Ver</a>` : ''}</p>
  </div>`).join('')}` : ''}

  ${certUnicos.length ? `
  <h2>Certificados</h2>
  <div class="two-col">
    ${certUnicos.map(c => `
    <div class="cert-item">
      <strong>${c.nombre}</strong>
      <div class="cert-meta">${[c.emisor, c.fecha].filter(Boolean).join(' · ')}</div>
    </div>`).join('')}
  </div>` : ''}

  ${allTechs.length ? `
  <h2>Habilidades técnicas</h2>
  <div class="skills">
    ${allTechs.map(t => `<span class="skill">${t}</span>`).join('')}
  </div>` : ''}
</body>
</html>`
}

async function generatePDF() {
  console.log(`📄 Generating ${PDF_NAME}...`)

  const html = generateHTML()
  ensureDir(OUTPUT_DIR)

  // Save HTML preview
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
      console.log('   Open public/cv/cv-preview.html and print to PDF manually.')
      return
    }

    const browser = await puppeteer.default.launch({
      headless: true,
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'load' })

    // Remove old CVs from other years
    const existingFiles = fs.readdirSync(OUTPUT_DIR)
    for (const f of existingFiles) {
      if (f.startsWith('CV Valen') && f.endsWith('.pdf') && f !== PDF_NAME) {
        fs.unlinkSync(path.join(OUTPUT_DIR, f))
        console.log(`  🗑️ Removed old: ${f}`)
      }
    }

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
