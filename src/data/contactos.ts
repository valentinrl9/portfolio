export interface ContactoItem {
  tipo: string;
  icono: string;
  detalle: string;
  link: string;
}

// Email ofuscado para evitar scrapers
const _e = ["valentinruizleon", "gmail.com"];
export const email = () => `${_e[0]}@${_e[1]}`;

export const contactos: ContactoItem[] = [
  {
    tipo: "Email",
    icono: "/img/gmail.png",
    detalle:
      "Déjame cualquier información o sugerencia en mi correo electrónico.",
    link: "", // se construye dinámicamente en el componente
  },
  {
    tipo: "LinkedIn",
    icono: "/img/linkedin.png",
    detalle:
      "Conéctate conmigo para estar al corriente de mis próximos pasos profesionales. Estaré encantado de aceptarte.",
    link: "https://www.linkedin.com/in/valentin-ruiz-823b31286",
  },
  {
    tipo: "GitHub",
    icono: "/img/Github.png",
    detalle:
      "Échale un vistazo a mis proyectos y repositorios públicos, así podrás saber cómo trabajo.",
    link: "https://github.com/valentinrl9",
  },
  {
    tipo: "Discord",
    icono: "/img/discord.png",
    detalle: "¡Hablemos por Discord! Agrégame como: valentinrl9_32198",
    link: "https://discord.com",
  },
];
