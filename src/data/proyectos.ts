export interface Proyecto {
  nombre: string;
  año: number;
  icono: "code" | "food" | "calculator";
  descripcion: string;
  tecnologias: string[];
  resultado: string;
  url: string;
  imagen: string;
}

export const proyectos: Proyecto[] = [
  {
    nombre: "Pendinails",
    año: 2025,
    icono: "code",
    descripcion:
      "Aplicación de una empresa que se dedica a vender pendientes hechos a partir de uñas sintéticas.",
    tecnologias: ["React", "Node.js", "Tailwind"],
    resultado:
      "Sistema funcional con hero, carrusel de productos y contactos.",
    url: "https://github.com/valentinrl9/pendinails",
    imagen: "/img/pendinails.png",
  },
  {
    nombre: "Empresa de paquetería (Proyecto Colaborativo)",
    año: 2025,
    icono: "code",
    descripcion:
      "App desarrollada en equipo durante mis prácticas en CodeArts Solutions...",
    tecnologias: ["Angular", "Symfony", "Tailwind", "PostgreSQL"],
    resultado: "Empezado desde cero y dejado bastante avanzado...",
    url: "",
    imagen: "/img/paqueteria.png",
  },
  {
    nombre: "Recetas del mundo",
    año: 2025,
    icono: "food",
    descripcion:
      "Aplicación personal para encontrar recetas. Tecnología y cocina fusionadas...",
    tecnologias: ["React", "Tailwind"],
    resultado: "App responsive y funcional, en continua mejora.",
    url: "https://que-cocino-hoy.vercel.app",
    imagen: "/img/quecocino.png",
  },
  {
    nombre: "Suma ABN",
    año: 2026,
    icono: "calculator",
    descripcion:
      "Aplicación educativa basada en el método ABN para practicar sumas paso a paso de forma interactiva.",
    tecnologias: ["React", "CSS", "Canvas-Confetti"],
    resultado: "App funcional, intuitiva y en constante evolución.",
    url: "https://abn-weld.vercel.app/",
    imagen: "/img/icon-ABN.png",
  },
];
