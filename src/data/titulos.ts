// Manual titles are never removed. Drive only adds new ones.
export interface Titulo {
  nombre: string;
  centro: string;
  fecha: string;
  url: string;
  fuente: "drive" | "manual";
}

export const titulos: Titulo[] = [
  {
    nombre: "Técnico Superior en Desarrollo de Aplicaciones Web",
    centro: "ILERNA Online",
    fecha: "2022 – 2025",
    url: "https://drive.google.com/file/d/1u1kC2aheAJBcFdBuW9IDFjkc7wHchwpI/view?usp=drivesdk",
    fuente: "manual",
  },
  {
    nombre: "Técnico Superior en Administración y Finanzas",
    centro: "I.E.S. San Luis Rey",
    fecha: "2001",
    url: "",
    fuente: "manual",
  },
  {
    nombre: "Técnico Especialista en Electrónica Industrial",
    centro: "I.E.S. San Luis Rey",
    fecha: "1997",
    url: "",
    fuente: "manual",
  },
];
