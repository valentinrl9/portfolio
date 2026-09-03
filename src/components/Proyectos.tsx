'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { FaCode, FaUtensils, FaCalculator } from 'react-icons/fa6'
import {
  getProyectosDestacados,
  getOtrosProyectos,
  enlaceProyectoLabel,
  type ProyectoDisplay,
} from '../data/portfolio'

const iconMap: Record<ProyectoDisplay['icono'], React.ReactNode> = {
  code: <FaCode className="text-orange-400 text-3xl" aria-hidden="true" />,
  food: <FaUtensils className="text-orange-400 text-3xl" aria-hidden="true" />,
  calculator: <FaCalculator className="text-blue-500 text-3xl" aria-hidden="true" />,
}

function TarjetaProyecto({
  proyecto,
  index,
  activoIndex,
  setActivoIndex,
}: {
  proyecto: ProyectoDisplay
  index: number
  activoIndex: number | null
  setActivoIndex: (index: number | null) => void
}) {
  const activo = activoIndex === index
  const hasImage = Boolean(proyecto.imagen)

  return (
    <m.div
      key={`${proyecto.fuente ?? 'manual'}-${proyecto.nombre}`}
      role="listitem"
      onMouseEnter={() => setActivoIndex(index)}
      onMouseLeave={() => setActivoIndex(null)}
      onClick={() => setActivoIndex(activo ? null : index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setActivoIndex(activo ? null : index)
        }
      }}
      tabIndex={0}
      aria-expanded={activo}
      aria-label={`${proyecto.nombre} (${proyecto.año})`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`text-left bg-gray-100 text-gray-800 rounded-xl shadow-lg transition-all duration-500 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-400 ${
        activo ? 'bg-gray-200 py-4' : 'hover:bg-gray-200'
      }`}
    >
      <div className="p-6 flex items-center gap-3 border-b border-orange-300">
        {iconMap[proyecto.icono]}
        <h3 className="text-xl font-semibold">
          {proyecto.nombre}{' '}
          <span className="text-sm text-gray-600">({proyecto.año})</span>
        </h3>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          activo ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!activo}
      >
        <div className={`flex flex-col ${hasImage ? 'md:flex-row' : ''} items-start gap-6 p-6`}>
          {hasImage && (
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
              <Image
                src={proyecto.imagen}
                alt={`Captura de pantalla de ${proyecto.nombre}`}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          )}

          <div className={hasImage ? 'w-full md:w-1/2' : 'w-full'}>
            <p className="mb-2">{proyecto.descripcion}</p>
            {proyecto.tecnologias.length > 0 && (
              <>
                <p className="text-sm mb-1 font-semibold">Tecnologías:</p>
                <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Tecnologías usadas">
                  {proyecto.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      role="listitem"
                      className="bg-orange-400 text-black font-bold px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            )}
            {proyecto.resultado && (
              <p className="text-sm mb-4">
                <strong>Resultado:</strong> {proyecto.resultado}
              </p>
            )}
            {proyecto.url ? (
              <a
                href={proyecto.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                {enlaceProyectoLabel(proyecto.url)}
              </a>
            ) : (
              <p className="text-sm italic text-gray-600">
                Proyecto privado (sin demo disponible) o sin desplegar.
              </p>
            )}
          </div>
        </div>
      </div>
    </m.div>
  )
}

const Proyectos = () => {
  const [activoIndex, setActivoIndex] = useState<number | null>(null)
  const destacados = getProyectosDestacados()
  const otros = getOtrosProyectos()

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="proyectos"
        className="py-12 px-6 bg-black border-4 border-orange-500 rounded-2xl text-white max-w-6xl mx-auto scroll-mt-28"
        aria-label="Mis proyectos"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Mis Proyectos</h2>

        <div className="flex flex-col gap-8" role="list">
          {destacados.map((proyecto, index) => (
            <TarjetaProyecto
              key={proyecto.nombre}
              proyecto={proyecto}
              index={index}
              activoIndex={activoIndex}
              setActivoIndex={setActivoIndex}
            />
          ))}
        </div>

        {otros.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-orange-400 mb-4">Otros proyectos</h3>
            <div className="grid gap-3 md:grid-cols-2" role="list">
              {otros.map((proyecto) => (
                <a
                  key={proyecto.nombre}
                  href={proyecto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-900 border border-orange-500/40 rounded-lg p-4 hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <strong>{proyecto.nombre}</strong>
                  <span className="text-sm text-gray-400"> ({proyecto.año})</span>
                  <p className="text-sm text-gray-300 mt-2">{proyecto.descripcion}</p>
                  {proyecto.tecnologias.length > 0 && (
                    <p className="text-xs text-orange-300 mt-2">
                      {proyecto.tecnologias.join(' · ')}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </LazyMotion>
  )
}

export default Proyectos
