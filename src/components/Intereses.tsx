'use client'

import { useState } from 'react'
import { interesesProfesionales, interesesPersonales } from '../data/intereses'

interface InteresItemProps {
  icono: string
  nombre: string
  descripcion: string
}

const InteresItem: React.FC<InteresItemProps> = ({ icono, nombre, descripcion }) => {
  const [activo, setActivo] = useState(false)

  return (
    <button
      onClick={() => setActivo(!activo)}
      aria-expanded={activo}
      aria-label={nombre}
      className={`group text-left bg-white text-black rounded-xl shadow-md w-full overflow-hidden transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
        activo ? 'py-6 px-6 bg-orange-300' : 'hover:py-6 hover:px-6 hover:bg-orange-300'
      }`}
    >
      <div className="flex items-center gap-4 p-4 text-lg font-bold">
        <span className="text-3xl" aria-hidden="true">{icono}</span>
        <span>{nombre}</span>
      </div>
      <div
        className={`px-4 pb-4 text-sm font-medium transition-all duration-500 ease-in-out ${
          activo
            ? 'max-h-none opacity-100 overflow-visible'
            : 'max-h-0 opacity-0 overflow-hidden group-hover:max-h-[500px] group-hover:opacity-100'
        }`}
        aria-hidden={!activo}
      >
        {descripcion}
      </div>
    </button>
  )
}

const Intereses = () => (
  <section
    id="intereses"
    className="py-12 px-6 bg-black border-4 border-orange-500 rounded-2xl text-white max-w-6xl mx-auto scroll-mt-28"
    aria-label="Mis intereses personales y profesionales"
  >
    <h2 className="text-3xl font-bold text-center mb-10">Mis Intereses</h2>

    {/* Intereses Personales */}
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-6">Intereses Personales</h3>
      <div className="flex flex-wrap gap-4 justify-start">
        {interesesPersonales.map((item) => (
          <InteresItem key={item.nombre} {...item} />
        ))}
      </div>
    </div>

    {/* Intereses Profesionales */}
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-6">Intereses Profesionales</h3>
      <div className="flex flex-wrap gap-4 justify-start">
        {interesesProfesionales.map((item) => (
          <InteresItem key={item.nombre} {...item} />
        ))}
      </div>
    </div>
  </section>
)

export default Intereses
