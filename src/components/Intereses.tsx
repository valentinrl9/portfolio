import React from 'react'


const interesesProfesionales = [
  {
    nombre: 'Desarrollo general',
    icono: '💻',
    descripcion: 'Me apasiona dar vida a ideas a través del código, explorando soluciones eficientes y creativas en diferentes áreas del desarrollo.',
  },
  {
    nombre: 'Inteligencia Artificial',
    icono: '🧠',
    descripcion: 'Me intriga la capacidad de las máquinas para aprender, razonar y transformar la forma en que interactuamos con la tecnología. Es un tema que tengo pendiente en mi haber',
  },
  {
    nombre: 'Ciberseguridad',
    icono: '🔐',
    descripcion: 'Me interesa proteger la integridad de los sistemas y datos, anticipándome a amenazas y construyendo entornos digitales seguros. También me gustaría hacer proyectos en este sentido.',
  },
  {
    nombre: 'Big Data',
    icono: '📊',
    descripcion: 'También me gustaría en un futuro analizar grandes volúmenes de información para descubrir patrones, tomar decisiones inteligentes y potenciar proyectos innovadores.',
  },
];


const interesesPersonales = [
  {
    nombre: 'Familia',
    icono: '👨‍👩‍👧‍👦',
    descripcion: 'Mi familia es mi prioridad número 1. Todo lo que hago es por ellos. El trabajo duro y la dedicación que pongo en mi trabajo es para asegurarme de que tengan un buen futuro. También son mi primera motivación día a día.',
  },
  {
    nombre: 'Viajar',
    icono: '🌍',
    descripcion: 'Es mi segunda pasión. Siempre que puedo me gusta perderme, ya sea a 100 o a 10.000 Kms de distancia. Explorar nuevos rincones, sumergirme en culturas distintas y coleccionar memorias únicas que enriquecen mi mundo interior.',
  },
  {
    nombre: 'Playa',
    icono: '🏖️',
    descripcion: 'Desde que me mudé cerca de la playa, se ha convertido en mi refugio favorito. Me encanta caminar sintiendo la arena bajo los pies, mientras el sonido del mar me envuelve y me desconecta del ruido y el ritmo del mundo.'
  },
  {
    nombre: 'Naturaleza',
    icono: '🌿',
    descripcion: 'Es otra de las cosas que me transmite paz interior. De joven vivía en una localidad del interior de Córdoba, entonces no conocía aún las virtudes de la playa pero caminar entre los árboles, cruzar riachuelos, respirar aire puro y escuchar el sonido de los pájaros a mi alrededos me devuelve la paz interior.',
  },
  {
    nombre: 'Lectura',
    icono: '📚',
    descripcion: 'Con el poco tiempo que me queda libre después de todo lo anterior, otra cosa que me gusta mucho perderme entre páginas de las que pueda sacar nuevas ideas y alimentar la imaginación.',
  },
];

interface InteresItemProps {
  icono: string;
  nombre: string;
  descripcion: string;
}

const InteresItem: React.FC<InteresItemProps> = ({ icono, nombre, descripcion }) => (
  <div className="group bg-white text-black rounded-xl shadow-md w-full overflow-hidden transition-all duration-500 hover:py-6 hover:px-6 hover:bg-orange-300">
    <div className="flex items-center gap-4 p-4 text-lg font-bold">
      <span className="text-3xl">{icono}</span>
      <span>{nombre}</span>
    </div>

    <div className="max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500 ease-in-out px-4 pb-4 text-sm font-medium">
      {descripcion}
    </div>
  </div>
);




const Intereses = () => {
  return (
    <section className="py-12 px-6 bg-black border-4 border-orange-500 rounded-2xl text-white text-black max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">🎯 Mis Intereses</h2>


      {/* Intereses Personales */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">🏠 Intereses Personales</h3>
        <div className="flex flex-wrap gap-4 justify-start">
          {interesesPersonales.map((item, i) => (
            <InteresItem key={i} {...item} />
          ))}
        </div>
      </div>

      {/* Intereses Profesionales */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">💼 Intereses Profesionales</h3>
        <div className="flex flex-wrap gap-4 justify-start">
          {interesesProfesionales.map((item, i) => (
            <InteresItem key={i} {...item} />
          ))}
        </div>
      </div>

    </section>
  )
}

export default Intereses
