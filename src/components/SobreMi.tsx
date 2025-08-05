const SobreMi = () => {
  return (
    <section
      id="sobre-mi"
      className="py-12 px-6 bg-black border-4 border-orange-500 rounded-2xl text-white max-w-6xl mx-auto"    >
      <h1 className="text-4xl font-bold text-orange-500 mb-6 flex items-center gap-2">
        🎯 <span>Sobre mí</span>
      </h1>

      <p className="mb-4">
        👋 <strong className="font-semibold">¡Hola!</strong> Soy <span className="font-semibold">Valentin</span>, 
        un profesional multidisciplinar con más de <strong>25 años</strong> de trayectoria en los sectores asegurador, 
        tecnológico y educativo. Mi recorrido abarca desde la <em>instalación de antenas</em> hasta el <em>desarrollo 
        FullStack</em>, pasando por la gestión comercial y la formación técnica. En cada etapa hay algo que nunca ha 
        faltado: <strong>curiosidad</strong>, <strong>compromiso</strong> y <strong>ganas de aportar valor</strong>.
      </p>

      <p className="mb-4">
        ⚙️ He liderado equipos, coordinado oficinas, enseñado informática y, recientemente, he finalizado mis estudios 
        en <strong>Desarrollo de Aplicaciones Web</strong> por ILERNA Online. Completé mis prácticas profesionales 
        como <strong>Desarrollador FullStack</strong> en CodeArts Solutions, trabajando con tecnologías 
        como <code className="bg-gray-500 px-1 rounded">Angular</code>, <code className="bg-gray-500 px-1 rounded">
        Symfony</code> y <code className="bg-gray-500 px-1 rounded">PostgreSQL</code> sobre proyectos reales.
      </p>

      <p className="mb-4">
        Me gusta <span className="font-semibold">transformar ideas en soluciones eficientes</span>, y creo que el 
        <span className="italic">trabajo en equipo (con un toque de humor, claro)</span> es el verdadero motor de los 
        proyectos duraderos. Ahora, busco nuevas oportunidades donde seguir creciendo, aportar valor y disfrutar del 
        desarrollo como herramienta creativa y funcional.
      </p>

      <p>🚀 Durante mi formación y prácticas he trabajado con estos lenguajes.  </p>
      <div className="flex flex-wrap gap-2 mb-4">
        <code className="bg-gray-500 px-1 rounded">HTML5</code>
        <code className="bg-gray-500 px-1 rounded">CSS3</code>
        <code className="bg-gray-500 px-1 rounded">JavaScript</code>
        <code className="bg-gray-500 px-1 rounded">MySQL</code>
        <code className="bg-gray-500 px-1 rounded">C#</code>
        <code className="bg-gray-500 px-1 rounded">PHP</code>
        <code className="bg-gray-500 px-1 rounded">Java</code>
        <code className="bg-gray-500 px-1 rounded">Angular</code>
        <code className="bg-gray-500 px-1 rounded">Symfony</code>
        <code className="bg-gray-500 px-1 rounded">PostgreSQL</code>
        <code className="bg-gray-500 px-1 rounded">GitHub</code>
        <code className="bg-gray-500 px-1 rounded">TailwindCSS</code>
        <code className="bg-gray-500 px-1 rounded">React</code>
        <code className="bg-gray-500 px-1 rounded">Laravel</code>
        <code className="bg-gray-500 px-1 rounded">Python</code>
      </div>
      <p>
        Me defino por mi <span className="font-semibold">adaptabilidad</span>, mi 
        <span className="font-semibold">curiosidad constante</span> y mis 
        <span className="font-semibold"> ganas infinitas de aprender</span>… siempre con paciencia y actitud positiva 😎.
      </p>


      <blockquote className="mt-6 border-l-4 border-orange-500 pl-4 italic bg-orange-500 py-3 px-4 rounded shadow-sm text-black">
        💡 “Si algo no funciona, probablemente es porque aún no le dediqué suficiente tiempo.” <br />
        <span className="font-semibold">Spoiler profesional:</span> no me asustan los errores, los veo como <span className="italic">oportunidades disfrazadas</span>. Y si el sistema falla, siempre hay una buena excusa para reinventarlo.
      </blockquote>
    </section>
  );
};

export default SobreMi;


