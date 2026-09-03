/**
 * Sync script: reads Google Drive folder + GitHub API → merges with existing data.
 * Run via: npx tsx scripts/sync-portfolio.ts
 *
 * Reads the file/folder structure of a Google Drive folder ("CV Portfolio")
 * and merges new items into existing src/data/ files without removing anything.
 *
 * Expected Drive structure:
 *   CV Portfolio/
 *   ├── Certificados/      → PDFs, images of certificates
 *   ├── Títulos/            → Degree documents
 *   ├── Experiencia/        → Any docs about work experience
 *   └── ... (any other subfolder becomes a category)
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY
 *   GOOGLE_DRIVE_FOLDER_ID   - ID of the "CV Portfolio" folder
 *   GITHUB_USERNAME           - defaults to valentinrl9
 */

import { google } from 'googleapis'
import * as fs from 'fs'
import * as path from 'path'

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env')
  if (!fs.existsSync(envPath)) return
  for (const rawLine of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnv()

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID!
const GITHUB_USER = process.env.GITHUB_USERNAME || 'valentinrl9'
const DATA_DIR = path.join(__dirname, '..', 'src', 'data')

// ─── Google Auth ──────────────────────────────────────────────────

async function getGoogleAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })
}

// ─── Drive: list subfolders and files ─────────────────────────────

interface DriveFile {
  id: string
  name: string
  mimeType: string
  createdTime: string
  webViewLink?: string
}

async function listDriveFolder(folderId: string): Promise<DriveFile[]> {
  const auth = await getGoogleAuth()
  const drive = google.drive({ version: 'v3', auth })
  const items: DriveFile[] = []
  let pageToken: string | undefined

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, createdTime, webViewLink)',
      pageSize: 100,
      pageToken,
    })
    if (res.data.files) {
      items.push(
        ...res.data.files.map(f => ({
          id: f.id!,
          name: f.name!,
          mimeType: f.mimeType!,
          createdTime: f.createdTime!,
          webViewLink: f.webViewLink || undefined,
        }))
      )
    }
    pageToken = res.data.nextPageToken || undefined
  } while (pageToken)

  return items
}

async function scanDriveStructure() {
  console.log('📂 Scanning Drive folder...')
  const topLevel = await listDriveFolder(FOLDER_ID)

  const structure: Record<string, DriveFile[]> = {}

  for (const item of topLevel) {
    if (item.mimeType === 'application/vnd.google-apps.folder') {
      const children = await listDriveFolder(item.id)
      structure[item.name] = children.filter(
        c => c.mimeType !== 'application/vnd.google-apps.folder'
      )
      console.log(`  📁 ${item.name}: ${structure[item.name].length} archivos`)
    }
  }

  // Also include root-level files (not in subfolders)
  const rootFiles = topLevel.filter(
    f => f.mimeType !== 'application/vnd.google-apps.folder'
  )
  if (rootFiles.length > 0) {
    structure['_root'] = rootFiles
    console.log(`  📄 Raíz: ${rootFiles.length} archivos`)
  }

  return structure
}

// ─── Merge logic: add new, keep existing ──────────────────────────

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function readExistingData<T>(filepath: string): T[] {
  if (!fs.existsSync(filepath)) return []
  const content = fs.readFileSync(filepath, 'utf-8')
  const match = content.match(/:\s*\w+\[\]\s*=\s*(\[[\s\S]*\]);?\s*$/)
  if (match) {
    try {
      return JSON.parse(match[1])
    } catch {
      // fallback
    }
  }
  return []
}

function writeDataFile(filename: string, content: string) {
  ensureDir(DATA_DIR)
  const filepath = path.join(DATA_DIR, filename)
  fs.writeFileSync(filepath, content, 'utf-8')
  console.log(`  ✅ ${filepath}`)
}

// ─── Sync Certificados from Drive ─────────────────────────────────

interface Certificado {
  nombre: string
  emisor: string
  fecha: string
  url: string
  fuente: 'drive' | 'manual'
}

function syncCertificados(driveFiles: DriveFile[]) {
  const filepath = path.join(DATA_DIR, 'certificados.ts')
  const existing: Certificado[] = readExistingData(filepath)
  const existingKeys = new Set(
    existing.map(c => `${c.nombre.toLowerCase()}|${c.url}`)
  )

  let added = 0
  for (const file of driveFiles) {
    const cleanName = file.name.replace(/\.(pdf|png|jpg|jpeg|webp)$/i, '').trim()
    const url = file.webViewLink || ''
    if (existingKeys.has(`${cleanName.toLowerCase()}|${url}`)) continue

    existing.push({
      nombre: cleanName,
      emisor: '',
      fecha: new Date(file.createdTime).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
      }),
      url,
      fuente: 'drive',
    })
    existingKeys.add(`${cleanName.toLowerCase()}|${url}`)
    added++
  }

  writeDataFile(
    'certificados.ts',
    `// Synced from Google Drive + manual entries — new items auto-added, existing preserved
export interface Certificado {
  nombre: string;
  emisor: string;
  fecha: string;
  url: string;
  fuente: 'drive' | 'manual';
}

export const certificados: Certificado[] = ${JSON.stringify(existing, null, 2)};
`
  )
  console.log(`  📜 Certificados: ${added} nuevos, ${existing.length} total`)
}

// ─── Sync Títulos from Drive ──────────────────────────────────────

interface Titulo {
  nombre: string
  centro: string
  fecha: string
  url: string
  fuente: 'drive' | 'manual'
}

function syncTitulos(driveFiles: DriveFile[]) {
  const filepath = path.join(DATA_DIR, 'titulos.ts')
  const existing: Titulo[] = readExistingData(filepath)
  const existingNames = new Set(existing.map(t => t.nombre.toLowerCase()))

  let added = 0
  for (const file of driveFiles) {
    const cleanName = file.name.replace(/\.(pdf|png|jpg|jpeg|webp)$/i, '').trim()
    if (existingNames.has(cleanName.toLowerCase())) continue

    existing.push({
      nombre: cleanName,
      centro: '',
      fecha: new Date(file.createdTime).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
      }),
      url: file.webViewLink || '',
      fuente: 'drive',
    })
    added++
  }

  writeDataFile(
    'titulos.ts',
    `// Synced from Google Drive + manual entries
export interface Titulo {
  nombre: string;
  centro: string;
  fecha: string;
  url: string;
  fuente: 'drive' | 'manual';
}

export const titulos: Titulo[] = ${JSON.stringify(existing, null, 2)};
`
  )
  console.log(`  🎓 Títulos: ${added} nuevos, ${existing.length} total`)
}

// ─── Sync generic folder (catchall) ──────────────────────────────

interface DriveItem {
  nombre: string
  categoria: string
  fecha: string
  url: string
}

function syncGenericFolder(folderName: string, driveFiles: DriveFile[]) {
  const safeName = folderName.toLowerCase().replace(/[^a-z0-9]/g, '-')
  const filename = `drive-${safeName}.ts`
  const filepath = path.join(DATA_DIR, filename)
  const existing: DriveItem[] = readExistingData(filepath)
  const existingNames = new Set(existing.map(i => i.nombre.toLowerCase()))

  let added = 0
  for (const file of driveFiles) {
    const cleanName = file.name.replace(/\.(pdf|png|jpg|jpeg|webp|docx?)$/i, '').trim()
    if (existingNames.has(cleanName.toLowerCase())) continue

    existing.push({
      nombre: cleanName,
      categoria: folderName,
      fecha: new Date(file.createdTime).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
      }),
      url: file.webViewLink || '',
    })
    added++
  }

  writeDataFile(
    filename,
    `// Synced from Google Drive folder: ${folderName}
export interface DriveItem {
  nombre: string;
  categoria: string;
  fecha: string;
  url: string;
}

export const ${safeName.replace(/-/g, '_')}: DriveItem[] = ${JSON.stringify(existing, null, 2)};
`
  )
  console.log(`  📁 ${folderName}: ${added} nuevos, ${existing.length} total`)
}

// ─── GitHub: merge new repos with existing projects ───────────────

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  updated_at: string
  fork: boolean
  archived: boolean
}

async function syncGitHubProjects() {
  console.log('\n🐙 Fetching GitHub repos...')

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=owner`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    }
  )
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  const repos: GitHubRepo[] = await res.json()
  const publicRepos = repos.filter(r => !r.fork && !r.archived)

  // Read existing manual projects — NEVER touch these
  const manualPath = path.join(DATA_DIR, 'proyectos.ts')

  // Read existing github projects and merge
  const ghPath = path.join(DATA_DIR, 'github-projects.ts')
  const existingGH = readExistingData<{ github_url: string }>(ghPath)
  const existingUrls = new Set(existingGH.map(p => p.github_url))

  const allGH = [...existingGH]
  let added = 0

  for (const r of publicRepos) {
    if (existingUrls.has(r.html_url)) continue

    allGH.push({
      nombre: r.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      año: new Date(r.updated_at).getFullYear(),
      icono: 'code',
      descripcion: r.description || 'Sin descripción.',
      tecnologias: [r.language, ...r.topics].filter(Boolean),
      resultado: '',
      url: r.homepage || r.html_url,
      imagen: '',
      fuente: 'github',
      github_url: r.html_url,
    } as any)
    added++
  }

  writeDataFile(
    'github-projects.ts',
    `// Auto-synced from GitHub — new repos added, existing preserved
export interface GitHubProject {
  nombre: string;
  año: number;
  icono: string;
  descripcion: string;
  tecnologias: string[];
  resultado: string;
  url: string;
  imagen: string;
  fuente: 'github';
  github_url: string;
}

export const githubProjects: GitHubProject[] = ${JSON.stringify(allGH, null, 2)};
`
  )
  console.log(`  📦 GitHub: ${added} nuevos repos, ${allGH.length} total`)
}

// ─── Main ─────────────────────────────────────────────────────────

async function main() {
  console.log('🔄 Syncing portfolio data...\n')

  // --- Google Drive ---
  const hasDriveCreds =
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY &&
    process.env.GOOGLE_DRIVE_FOLDER_ID

  if (hasDriveCreds) {
    const structure = await scanDriveStructure()

    for (const [folder, files] of Object.entries(structure)) {
      if (folder === '_root') continue
      const normalized = folder.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

      if (normalized.includes('certificad') || normalized.includes('curso')) {
        syncCertificados(files)
      } else if (
        normalized.includes('titulo') ||
        normalized.includes('formacion') ||
        normalized.includes('academ')
      ) {
        syncTitulos(files)
      } else {
        syncGenericFolder(folder, files)
      }
    }
  } else {
    console.log('⚠️  Google Drive credentials not set, skipping Drive sync.')
    console.log('   Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_DRIVE_FOLDER_ID')
  }

  // --- GitHub ---
  await syncGitHubProjects()

  console.log('\n✅ Sync complete!')
}

main().catch(err => {
  console.error('❌ Sync failed:', err)
  process.exit(1)
})
