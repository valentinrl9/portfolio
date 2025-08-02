import React from 'react';

const ContactoCard = ({ tipo, icono, detalle, link }: {
  tipo: string;
  icono: React.ReactNode;
  detalle: string;
  link: string;
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-white text-black rounded-xl shadow-md w-full overflow-hidden transition-all duration-500 hover:py-6 hover:px-6 hover:bg-orange-300"
  >
    <div className="flex items-center gap-4 p-4 text-lg font-bold">
      <span className="w-8 h-8">{icono}</span>
      <span>{tipo}</span>
    </div>

    <div className="max-h-0 opacity-0 px-4 pb-4 text-sm font-medium group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
      {detalle}
    </div>
  </a>
);

const Contacto = () => (
  <section className="py-12 px-6 bg-black border-4 border-orange-500 rounded-2xl text-white max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-10">📞 Contacto</h2>

    <div className="grid gap-4 md:grid-cols-2">
      <ContactoCard
        tipo="Email"
        icono={
          <img
            src="img/gmail.png"
            alt="Gmail icon"
            className="w-full h-full object-contain"
          />
        }
        detalle="Déjame cualquier información o sugerencia en mi correo electrónico. valentinruizleon@gmail.com"
        link="mailto:valentinruizleon@gmail.com"
      />

      <ContactoCard
        tipo="LinkedIn"
        icono={
          <img
            src="/img/linkedin.png"
            alt="LinkedIn icon"
            className="w-full h-full object-contain"
          />
        }
        detalle="Conéctate conmigo para estar al corriente de mis próximos pasos profesionales. Estaré encantado de aceptarte."
        link="https://www.linkedin.com/in/valentin-ruiz-823b31286"
      />

      <ContactoCard
        tipo="GutHub"
        icono={
          <img
            src="/img/Github.png"
            alt="GitHub icon"
            className="w-full h-full object-contain"
          />
        }
        detalle="Échale un vistazo a mis proyectos y repositorios públicos, así podrás saber como trabajo."
        link="https://www.https://github.com/valentinrl9"
      />

      <ContactoCard
        tipo="Discord"
        icono={
          <img
            src="/img/discord.png"
            alt="Discord icon"
            className="w-full h-full object-contain"
          />
        }
        detalle="¡Hablemos por Discord! Agrégame como: valentinrl9_32198"
        link="https://discord.com"
      />
    </div>
  </section>
);

export default Contacto;
