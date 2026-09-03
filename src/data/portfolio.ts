import { proyectos, type Proyecto } from "./proyectos";
import { githubProjects } from "./github-projects";
import { certificados, type Certificado } from "./certificados";
import { titulos, type Titulo } from "./titulos";
import { proyectosOcultos } from "./proyectos-ocultos";
import { formacionBase, cursosComplementarios } from "./cv-base";

export type ProyectoDisplay = Proyecto & {
  fuente?: "manual" | "github";
  github_url?: string;
};

export interface CertificadoGrupo {
  nombre: string;
  emisor: string;
  fecha: string;
  urls: string[];
}

const MESES: Record<string, number> = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
};

export function parseFecha(fecha: string): number {
  const lower = fecha.toLowerCase();
  const year = Number(lower.match(/\d{4}/)?.[0] || 0);
  const monthName = Object.keys(MESES).find((m) => lower.includes(m));
  const month = monthName ? MESES[monthName] : 0;
  return year * 100 + month;
}

function normalizeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isHidden(name: string) {
  return proyectosOcultos.some((h) => normalizeName(h) === normalizeName(name));
}

function isGithubUrl(url: string) {
  return url.includes("github.com");
}

/** Manual projects + GitHub repos, without duplicates. Manual entries always win. */
export function getAllProyectos(): ProyectoDisplay[] {
  const hiddenNames = new Set(proyectosOcultos.map(normalizeName));
  const githubByName = new Map(
    githubProjects.map((p) => [normalizeName(p.nombre), p])
  );

  const manual: ProyectoDisplay[] = proyectos.map((p) => {
    const gh = githubByName.get(normalizeName(p.nombre));
    return {
      ...p,
      url: p.url || gh?.url || gh?.github_url || "",
      fuente: "manual" as const,
      github_url: gh?.github_url,
    };
  });

  const manualUrls = new Set(
    manual.map((p) => p.url).filter(Boolean).map((u) => u.toLowerCase())
  );
  const manualNames = new Set(manual.map((p) => normalizeName(p.nombre)));

  const fromGitHub: ProyectoDisplay[] = githubProjects
    .filter((p) => {
      if (hiddenNames.has(normalizeName(p.nombre))) return false;
      if (isHidden(p.nombre)) return false;
      if (p.url && manualUrls.has(p.url.toLowerCase())) return false;
      if (manualNames.has(normalizeName(p.nombre))) return false;
      return true;
    })
    .map((p) => ({
      nombre: p.nombre,
      año: p.año,
      icono: "code" as const,
      descripcion:
        p.descripcion === "Sin descripción."
          ? "Proyecto disponible en GitHub."
          : p.descripcion,
      tecnologias: p.tecnologias.filter(Boolean),
      resultado: p.resultado || "",
      url: p.url,
      imagen: p.imagen || "",
      fuente: "github" as const,
      github_url: p.github_url,
    }));

  return [...manual, ...fromGitHub].sort((a, b) => b.año - a.año);
}

export function getProyectosDestacados(): ProyectoDisplay[] {
  return getAllProyectos().filter((p) => p.fuente === "manual" || Boolean(p.imagen));
}

export function getOtrosProyectos(): ProyectoDisplay[] {
  return getAllProyectos().filter((p) => p.fuente === "github" && !p.imagen);
}

export function enlaceProyectoLabel(url: string) {
  if (isGithubUrl(url)) return "Ver en GitHub";
  return "Ver demo";
}

export function getCertificados(): Certificado[] {
  return [...certificados].sort((a, b) => parseFecha(b.fecha) - parseFecha(a.fecha));
}

export function getCertificadosAgrupados(): CertificadoGrupo[] {
  const groups = new Map<string, CertificadoGrupo>();
  for (const c of cursosComplementarios) {
    groups.set(c.nombre.toLowerCase(), {
      nombre: c.nombre,
      emisor: "",
      fecha: c.duracion,
      urls: [],
    });
  }
  for (const c of getCertificados()) {
    const key = c.nombre.toLowerCase();
    const existing = groups.get(key);
    if (existing) {
      if (c.url && !existing.urls.includes(c.url)) existing.urls.push(c.url);
    } else {
      groups.set(key, {
        nombre: c.nombre,
        emisor: c.emisor,
        fecha: c.fecha,
        urls: c.url ? [c.url] : [],
      });
    }
  }
  return [...groups.values()];
}

function sameTitulo(a: string, b: string) {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  if (na === nb) return true;
  const daw = (n: string) =>
    n.includes("desarrollodeaplicacionesweb") || n.includes("gradosuperiordaw");
  return daw(na) && daw(nb);
}

export function getTitulos(): Titulo[] {
  const merged: Titulo[] = formacionBase.map((f) => ({
    nombre: f.nombre,
    centro: f.centro,
    fecha: f.fecha,
    url: "",
    fuente: "manual" as const,
  }));
  for (const t of titulos) {
    const target = merged.find((m) => sameTitulo(m.nombre, t.nombre));
    if (target) {
      if (t.url && !target.url) target.url = t.url;
      continue;
    }
    merged.push(t);
  }
  return merged;
}

export function hasFormacion(): boolean {
  return getTitulos().length > 0 || getCertificados().length > 0;
}

const SKILLS_BASE = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "PHP",
  "Laravel",
  "Symfony",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "MySQL",
  "PostgreSQL",
  "Drupal",
  "TailwindCSS",
  "GitHub",
];

export function getSkills(): string[] {
  const extra = new Set<string>();
  for (const c of certificados) {
    const n = c.nombre.toLowerCase();
    if (n.includes("drupal")) extra.add("Drupal");
    if (n.includes("java")) extra.add("Java");
    if (n.includes("hacking")) extra.add("Ciberseguridad");
    if (n.includes(" ia") || n.includes("inteligencia")) extra.add("IA");
  }
  for (const p of getAllProyectos()) {
    p.tecnologias.forEach((t) => extra.add(t));
  }
  const merged = [...SKILLS_BASE];
  for (const s of extra) {
    if (!merged.some((m) => m.toLowerCase() === s.toLowerCase())) merged.push(s);
  }
  return merged;
}
