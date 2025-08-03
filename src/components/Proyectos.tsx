import React from 'react'
import { FaCode, FaUtensils } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Image from 'next/image'

const proyectos = [
  {
    nombre: 'Empresa de paquetería (Proyecto Colaborativo)',
    año: 2025,
    icono: <FaCode className="text-orange-400 text-3xl" />,
    descripcion:
      'App desarrollada en equipo durante mis prácticas en CodeArts Solutions para clientes reales. Trabajando principalmente en un Backend sólido, apoyando un frontend brillante y todo ello con mucho buen rollo',
    tecnologias: ['Angular', 'Symfony', 'Tailwind', 'PostgreSQL'],
    resultado:
      'Empezado desde cero y dejado bastante avanzado para ser continuado por otros compañeros.',
    url: '',
    imagen: '/img/paqueteria.png'
  },
  {
    nombre: 'Recetas del mundo',
    año: 2025,
    icono: <FaUtensils className="text-orange-400 text-3xl" />,
    descripcion:
      'Aplicación personal para encontrar recetas. Tecnología y cocina fusionadas con sabor 🍝',
    tecnologias: ['React', 'Tailwind'],
    resultado: 'App responsive y funcional, en continua mejora.',
    url: 'https://que-cocino-hoy.vercel.app',
    imagen: '/img/quecocino.png'
  }
]

const Proyectos = () => {
  return (
    <section className="py-12 px-6 bg-black border-4 border-orange-500 rounded-2xl text-white max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">🚀 Mis Proyectos</h2>
      <div className="flex flex-col gap-8">
        {proyectos.map((proyecto, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-gray-100 text-gray-800 rounded-xl shadow-lg transition-all duration-500 relative group overflow-hidden hover:bg-gray-200"
          >
            <div className="p-6 flex items-center gap-3 border-b border-orange-300">
              {proyecto.icono}
              <h3 className="text-xl font-semibold">
                {proyecto.nombre}{' '}
                <span className="text-sm text-gray-500">({proyecto.año})</span>
              </h3>
            </div>

            <div className="max-h-0 opacity-0 group-hover:max-h-[1000px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
              <div className="flex flex-col md:flex-row items-start gap-6 p-6">
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                  <Image
                    src={proyecto.imagen}
                    alt={`Imagen de ${proyecto.nombre}`}
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <p className="mb-2">{proyecto.descripcion}</p>
                  <p className="text-sm mb-1 font-semibold">Tecnologías:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proyecto.tecnologias.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-400 text-black font-bold px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    <strong>Resultado:</strong> {proyecto.resultado}
                  </p>
                  {proyecto.url ? (
                    <a
                      href={proyecto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                    >
                      Ver proyecto 🔍
                    </a>
                  ) : (
                    <p className="text-sm italic text-gray-500">
                      Proyecto privado, sin demo disponible.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Proyectos
