import React, { useState } from 'react'

const interesesProfesionales = [
  { nombre: 'Desarrollo general', icono: '💻', descripcion: 'Me apasiona dar vida a ideas a través del código, con pequeños pasos y mucha curiosidad. Cada línea que escribo me acerca un poquito más a crear soluciones útiles y seguir aprendiendo algo nuevo cada día.' },
  { nombre: 'Inteligencia Artificial', icono: '🧠', descripcion: 'Me intriga la capacidad de las máquinas para aprender y cómo, poco a poco, están ayudándonos a entender mejor el mundo. Me entusiasma descubrir su potencial para mejorar la vida de las personas, y seguir explorando este campo con humildad, curiosidad y ganas de crecer.' },
  { nombre: 'Ciberseguridad', icono: '🔐', descripcion: 'Me interesa proteger la integridad de los sistemas y datos porque detrás de cada byte hay confianza depositada por alguien. Me ilusiona aprender cada día nuevas formas de fortalecer esa seguridad, con humildad y compromiso, sabiendo que incluso los pequeños avances pueden marcar una gran diferencia.' },
  { nombre: 'Big Data', icono: '📊', descripcion: 'También me gustaría en un futuro analizar grandes volúmenes de información para descubrir patrones, entender comportamientos y contribuir a tomar decisiones más inteligentes. Me motiva pensar que detrás de los datos hay historias esperando ser contadas, y quiero seguir formándome para poder ayudar a interpretarlas con responsabilidad y curiosidad.' },
]

const interesesPersonales = [
  { nombre: 'Familia', icono: '👨‍👩‍👧‍👦', descripcion: 'Mi familia es mi prioridad número 1, es el motivo principal en mi vida. Cada logro, cada aprendizaje, cobra aún más sentido cuando sé que lo comparto con ellos. Me anima a ser constante, humilde y a seguir creciendo, no solo como profesional, sino como persona.' },
  { nombre: 'Viajar', icono: '🌍', descripcion: 'Es mi segunda pasión. Siempre que puedo me gusta perderme en nuevos países, paisajes, culturas y experiencias que me enriquecen como persona. Viajar me ayuda a ampliar mi perspectiva, conectar con realidades distintas y volver siempre con nuevas ideas y energías renovadas.' },
  { nombre: 'Playa', icono: '🏖️', descripcion: 'Desde que me mudé cerca de la playa, se ha convertido en mi refugio favorito. Es un lugar que me ayuda a desconectar, pensar y recargar energías. El sonido de las olas, la brisa, las gaviotas y ver el horizonte abierto me inspiran calma y me recuerdan la belleza de lo simple.' },
  { nombre: 'Naturaleza', icono: '🌿', descripcion: 'Es otra de las cosas que me transmite paz interior. Mi juventud ha estado en un pueblo del interior de Córdoba. Mis recuerdos de la infancia están ligadas al campo, senderos, riachuelos y el cantar de los pájaros. Estar rodeado de todo esto me ayuda a desconectar y reencontrarme conmigo mismo. En la naturaleza encuentro un equilibrio que me inspira a avanzar con serenidad, tanto en lo personal como en lo profesional.' },
  { nombre: 'Lectura', icono: '📚', descripcion: 'Con el poco tiempo que me queda libre después de todo lo anterior encuentro en la lectura un rincón donde seguir explorando ideas, mundos y pensamientos. Siempre que puedo, me gusta leer un libro que pueda aportar algo positivo a mi vida. Algo que encienda la chispa de la curiosidad y me genere nuevas ideas.' },
]

interface InteresItemProps {
  icono: string;
  nombre: string;
  descripcion: string;
}

const InteresItem: React.FC<InteresItemProps> = ({ icono, nombre, descripcion }) => {
  const [activo, setActivo] = useState(false)

  return (
    <button
      onClick={() => setActivo(!activo)}
      className={`group text-left bg-white text-black rounded-xl shadow-md w-full overflow-hidden transition-all duration-500 ${
        activo ? 'py-6 px-6 bg-orange-300' : 'hover:py-6 hover:px-6 hover:bg-orange-300'
      }`}
    >
      <div className="flex items-center gap-4 p-4 text-lg font-bold">
        <span className="text-3xl">{icono}</span>
        <span>{nombre}</span>
      </div>
      <div
        className={`px-4 pb-4 text-sm font-medium transition-all duration-500 ease-in-out ${
          activo
            ? 'max-h-none opacity-100 overflow-visible'
            : 'max-h-0 opacity-0 overflow-hidden group-hover:max-h-[500px] group-hover:opacity-100'
        }`}
      >
        {descripcion}
      </div>

    </button>
  )
}

const Intereses = () => (
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

export default Intereses
