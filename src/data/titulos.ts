// Synced from Google Drive + manual entries
export interface Titulo {
  nombre: string;
  centro: string;
  fecha: string;
  url: string;
  fuente: "drive" | "manual";
}

export const titulos: Titulo[] = [
  {
    nombre: "Grado superior DAW",
    centro: "ILERNA Online",
    fecha: "septiembre de 2026",
    url: "https://drive.google.com/file/d/1u1kC2aheAJBcFdBuW9IDFjkc7wHchwpI/view?usp=drivesdk",
    fuente: "drive",
  },
];
