// Synced from Google Drive + manual entries — new items auto-added, existing preserved
export interface Certificado {
  nombre: string;
  emisor: string;
  fecha: string;
  url: string;
  fuente: 'drive' | 'manual';
}

export const certificados: Certificado[] = [
  {
    "nombre": "Curso EOI Desafío Emprendedor",
    "emisor": "",
    "fecha": "septiembre de 2026",
    "url": "https://drive.google.com/file/d/1uXg0RIn62FH_aJMKdpVigqsQMAOuJ2h8/view?usp=drivesdk",
    "fuente": "drive"
  },
  {
    "nombre": "Certificado Hacking ético 6h",
    "emisor": "",
    "fecha": "abril de 2026",
    "url": "https://drive.google.com/file/d/1QnC4iynv3PfZU-JfjG2vaR1VigosH5cH/view?usp=drivesdk",
    "fuente": "drive"
  },
  {
    "nombre": "Certificado Inicio IA",
    "emisor": "",
    "fecha": "octubre de 2025",
    "url": "https://drive.google.com/file/d/1WMmu4BKsYltxcYuyWouZZin2Wpir20p9/view?usp=drivesdk",
    "fuente": "drive"
  },
  {
    "nombre": "Drupal 10 (30 horas)",
    "emisor": "",
    "fecha": "septiembre de 2025",
    "url": "https://drive.google.com/file/d/1tYuGzxZ7tqLlhdWevI9UQeQIwYWi0Omm/view?usp=drivesdk",
    "fuente": "drive"
  },
  {
    "nombre": "Certificado Inicio Drupal 11",
    "emisor": "",
    "fecha": "agosto de 2025",
    "url": "https://drive.google.com/file/d/1NAzUwe4WdWmMRJkt3ddDy8NC4JtMG98A/view?usp=drivesdk",
    "fuente": "drive"
  },
  {
    "nombre": "Programación Java Standard 40h",
    "emisor": "",
    "fecha": "diciembre de 2022",
    "url": "https://drive.google.com/file/d/1tAx7_3WHUnkWpy_XCJCJu8KqQwGIziTH/view?usp=drivesdk",
    "fuente": "drive"
  }
];
