// Base del CV. El sync de Drive/GitHub NUNCA debe sobrescribir este archivo.
// Solo se añaden proyectos y cursos nuevos al generar el PDF.

export const persona = {
  nombre: "Valentín Ruiz León",
  titulo: "Desarrollador Web FullStack",
  ubicacion: "El Ejido (Almería)",
  telefono: "622 121 155",
  email: "valentinruizleon@gmail.com",
  github: "https://github.com/valentinrl9",
  linkedin: "https://www.linkedin.com/in/valentin-ruiz-823b31286",
  portfolio: "https://portfolio-sigma-five-65.vercel.app",
} as const;

export const perfil = `Profesional multidisciplinar con más de 20 años de experiencia en administración, docencia técnica y gestión comercial en los sectores asegurador y tecnológico. Destaco por mi liderazgo, capacidad de organización, orientación al cliente y continua formación en desarrollo web, finanzas y electrónica. Busco aportar valor en entornos dinámicos mediante soluciones eficientes y trabajo en equipo.`;

export interface Experiencia {
  empresa: string;
  puesto: string;
  fecha: string;
  puntos: string[];
}

export const experiencia: Experiencia[] = [
  {
    empresa: "CodeArts Solutions",
    puesto: "Desarrollador FullStack",
    fecha: "Junio – Julio 2025",
    puntos: [
      "Contrato en prácticas.",
      "Onboarding individual para tomar contacto con Angular, Symfony y GitHub.",
      "Desarrollo frontend (Angular) y backend (Symfony) con cliente real.",
      "Trabajo con base de datos PostgreSQL y control de versiones con GitHub.",
    ],
  },
  {
    empresa: "SANTALUCIA",
    puesto: "Administrativo e Inspector de Zona",
    fecha: "2005 – Actualidad",
    puntos: [
      "Coordinación de procesos administrativos y comerciales en zona asignada.",
      "Atención personalizada a clientes y gestión documental.",
      "Supervisión de equipos y cumplimiento de objetivos.",
      "Gerente de oficina en Salobreña durante 4,5 años (equipo de 5 personas).",
    ],
  },
  {
    empresa: "MEGAPAL",
    puesto: "Profesor de Informática y Técnico en Hardware",
    fecha: "2000 – 2005",
    puntos: [
      "Formación en software ofimático y técnico.",
      "Reparación y configuración de equipos informáticos.",
      "Instalación y mantenimiento de redes locales.",
    ],
  },
  {
    empresa: "COTELSUR",
    puesto: "Instalador de Sistemas Eléctricos y Antenas",
    fecha: "1997 – 1998",
    puntos: [
      "Montaje de instalaciones eléctricas industriales y domésticas.",
      "Instalación de antenas digitales y sistemas de telecomunicaciones.",
    ],
  },
];

export interface FormacionBase {
  nombre: string;
  centro: string;
  fecha: string;
  detalle?: string;
}

export const formacionBase: FormacionBase[] = [
  {
    nombre: "Técnico Superior en Desarrollo de Aplicaciones Web",
    centro: "ILERNA Online",
    fecha: "2022 – 2025",
    detalle: "Programación: Java, C#, PHP, JavaScript, HTML5, CSS3. Bases de datos: MySQL, Oracle. Redes, metodologías ágiles y desarrollo de proyectos web.",
  },
  {
    nombre: "Técnico Superior en Administración y Finanzas",
    centro: "I.E.S. San Luis Rey",
    fecha: "2001",
  },
  {
    nombre: "Técnico Especialista en Electrónica Industrial",
    centro: "I.E.S. San Luis Rey",
    fecha: "1997",
  },
];

export interface CursoBase {
  nombre: string;
  duracion: string;
}

export const cursosComplementarios: CursoBase[] = [
  { nombre: "Principios básicos del Big Data", duracion: "20h" },
  { nombre: "Programación con JavaScript", duracion: "40h" },
  { nombre: "Diseño Web con HTML5 y CSS", duracion: "30h" },
  { nombre: "WordPress básico", duracion: "30h" },
];

export const habilidades = [
  "Liderazgo y gestión de equipos",
  "Desarrollo web (HTML, CSS, JavaScript, PHP, React, Angular, Symfony)",
  "Administración financiera y documental",
  "Resolución de incidencias técnicas",
  "Atención al cliente y comunicación efectiva",
  "Metodologías ágiles (Scrum, Kanban)",
];

export const tecnologiasBase = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "PHP",
  "Java",
  "C#",
  "React",
  "Angular",
  "Symfony",
  "Node.js",
  "MySQL",
  "PostgreSQL",
  "Oracle",
  "TailwindCSS",
  "GitHub",
];
