'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { contactos, email } from '../data/contactos'

const ContactoCard = ({
  tipo,
  icono,
  detalle,
  link,
}: {
  tipo: string
  icono: string
  detalle: string
  link: string
}) => {
  const [activo, setActivo] = useState(false)

  return (
    <button
      onClick={() => setActivo(!activo)}
      aria-expanded={activo}
      aria-label={`${tipo} — ${detalle}`}
      className={`group text-left bg-white text-black rounded-xl shadow-md w-full overflow-hidden transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
        activo ? 'py-6 px-6 bg-orange-300' : 'hover:py-6 hover:px-6 hover:bg-orange-300'
      }`}
    >
      <div className="flex items-center gap-4 p-4 text-lg font-bold">
        <span className="w-8 h-8 relative flex-shrink-0">
          <Image src={icono} alt={`${tipo} icono`} fill sizes="32px" className="object-contain" />
        </span>
        <span>{tipo}</span>
      </div>

      <div
        className={`px-4 pb-4 text-sm font-medium transition-all duration-500 ease-in-out ${
          activo
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100'
        }`}
        aria-hidden={!activo}
      >
        {detalle}
        {link && (
          <div className="mt-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 underline font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={(e) => e.stopPropagation()}
            >
              Ir a {tipo}
            </a>
          </div>
        )}
      </div>
    </button>
  )
}

const Contacto = () => {
  const [emailLink, setEmailLink] = useState('')

  useEffect(() => {
    // Construimos el mailto dinámicamente para que no esté en el HTML estático
    setEmailLink(`mailto:${email()}`)
  }, [])

  return (
    <section
      id="contacto"
      className="py-12 px-6 bg-black border-4 border-orange-500 rounded-2xl text-white max-w-6xl mx-auto scroll-mt-28"
      aria-label="Información de contacto"
    >
      <h2 className="text-3xl font-bold text-center mb-10">Contacto</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {contactos.map((c) => (
          <ContactoCard
            key={c.tipo}
            tipo={c.tipo}
            icono={c.icono}
            detalle={c.detalle}
            link={c.tipo === 'Email' ? emailLink : c.link}
          />
        ))}
      </div>
    </section>
  )
}

export default Contacto
