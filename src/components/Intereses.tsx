import React, { useState } from 'react'

const interesesProfesionales = [
  { nombre: 'Desarrollo general', icono: '💻', descripcion: 'Me apasiona dar vida a ideas a través del código...' },
  { nombre: 'Inteligencia Artificial', icono: '🧠', descripcion: 'Me intriga la capacidad de las máquinas para aprender...' },
  { nombre: 'Ciberseguridad', icono: '🔐', descripcion: 'Me interesa proteger la integridad de los sistemas y datos...' },
  { nombre: 'Big Data', icono: '📊', descripcion: 'También me gustaría en un futuro analizar grandes volúmenes...' },
]

const interesesPersonales = [
  { nombre: 'Familia', icono: '👨‍👩‍👧‍👦', descripcion: 'Mi familia es mi prioridad número 1...' },
  { nombre: 'Viajar', icono: '🌍', descripcion: 'Es mi segunda pasión. Siempre que puedo me gusta perderme...' },
  { nombre: 'Playa', icono: '🏖️', descripcion: 'Desde que me mudé cerca de la playa, se ha convertido en mi refugio favorito...' },
  { nombre: 'Naturaleza', icono: '🌿', descripcion: 'Es otra de las cosas que me transmite paz interior...' },
  { nombre: 'Lectura', icono: '📚', descripcion: 'Con el poco tiempo que me queda libre después de todo lo anterior...' },
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
      <div className={`px-4 pb-4 text-sm font-medium transition-all duration-500 ease-in-out ${
        activo ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100'
      }`}>
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
