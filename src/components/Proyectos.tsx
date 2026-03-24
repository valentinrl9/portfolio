import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaCode, FaUtensils, FaCalculator } from 'react-icons/fa'

const proyectos = [
  {
    nombre: 'Pendinails',
    año: 2025,
    icono: <FaCode className="text-orange-400 text-3xl" />,
    descripcion: 'Aplicación de una empresa que se dedica a vender pendientes hechos a partir de uñas sintéticas.',
    tecnologias: ['React', 'Node.js', 'Tailwind'],
    resultado: 'Sistema funcional con hero, carrusel de productos y contactos.',
    url: '', 
    imagen: '/img/pendinails.png'
  },
  {
    nombre: 'Empresa de paquetería (Proyecto Colaborativo)',
    año: 2025,
    icono: <FaCode className="text-orange-400 text-3xl" />,
    descripcion: 'App desarrollada en equipo durante mis prácticas en CodeArts Solutions...',
    tecnologias: ['Angular', 'Symfony', 'Tailwind', 'PostgreSQL'],
    resultado: 'Empezado desde cero y dejado bastante avanzado...',
    url: '',
    imagen: '/img/paqueteria.png'
  },
  {
    nombre: 'Recetas del mundo',
    año: 2025,
    icono: <FaUtensils className="text-orange-400 text-3xl" />,
    descripcion: 'Aplicación personal para encontrar recetas. Tecnología y cocina fusionadas...',
    tecnologias: ['React', 'Tailwind'],
    resultado: 'App responsive y funcional, en continua mejora.',
    url: 'https://que-cocino-hoy.vercel.app',
    imagen: '/img/quecocino.png'
  },
  {
    nombre: 'Suma ABN',
    año: 2026,
    icono: <FaCalculator className="text-blue-500 text-3xl" />,
    descripcion: 'Aplicación educativa basada en el método ABN para practicar sumas paso a paso de forma interactiva.',
    tecnologias: ['React', 'CSS', 'Canvas-Confetti'],
    resultado: 'App funcional, intuitiva y en constante evolución.',
    url: 'https://abn-weld.vercel.app/',
    imagen: '/img/icon-ABN.png'
  }

]

const Proyectos = () => {
  // Especificamos que puede ser un número o null
  const [activoIndex, setActivoIndex] = useState<number | null>(null)

  const toggleActivo = (index: number) => {
    setActivoIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="py-12 px-6 bg-black border-4 border-orange-500 rounded-2xl text-white max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">🚀 Mis Proyectos</h2>
      <div className="flex flex-col gap-8">
        {proyectos.map((proyecto, index: number) => { // Tipamos el index aquí
          const activo = activoIndex === index
          return (
            <motion.div
              key={index}
              onMouseEnter={() => setActivoIndex(index)}
              onMouseLeave={() => setActivoIndex(null)}
              onClick={() => toggleActivo(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`text-left bg-gray-100 text-gray-800 rounded-xl shadow-lg transition-all duration-500 cursor-pointer overflow-hidden ${
                activo ? 'bg-gray-200 py-4' : 'hover:bg-gray-200'
              }`}
            >
              <div className="p-6 flex items-center gap-3 border-b border-orange-300">
                {proyecto.icono}
                <h3 className="text-xl font-semibold">
                  {proyecto.nombre}{' '}
                  <span className="text-sm text-gray-500">({proyecto.año})</span>
                </h3>
              </div>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  activo ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
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
                        onClick={(e) => e.stopPropagation()}
                        className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                      >
                        Ver proyecto 🔍
                      </a>
                    ) : (
                      <p className="text-sm italic text-gray-500">
                        Proyecto privado (sin demo disponible) o sin desplegar.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default Proyectos
