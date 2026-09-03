'use client'

import { useEffect, useState } from 'react'
import SobreMi from './SobreMi'
import Formacion from './Formacion'
import Proyectos from './Proyectos'
import Intereses from './Intereses'
import Contacto from './Contacto'
import HeroImage from './HeroImage'

const sections = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'formacion', label: 'Formación' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'intereses', label: 'Intereses' },
  { id: 'contacto', label: 'Contacto' },
] as const

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>('sobre-mi')
  const year = new Date().getFullYear()

  useEffect(() => {
    const ids = sections.map((s) => s.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          ¡Hola! Soy <span className="text-orange-400">Valentín</span>
        </h1>

        <p className="text-xl mb-6">
          Creativo digital, desarrollador curioso y constructor de experiencias web que marcan.
        </p>

        <HeroImage />

        <p className="text-xl mb-6 mt-4">
          Soy desarrollador web en crecimiento, con conocimientos tanto en frontend como en backend.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <a
            href={`/cv/CV Valen ${year}.pdf`}
            download
            className="inline-block px-6 py-3 border-2 border-orange-500 text-orange-400 font-semibold rounded-full transition-transform duration-300 hover:scale-105 hover:text-white hover:shadow-lg"
            aria-label="Descargar currículum en formato PDF"
          >
            Descargar CV
          </a>
        </div>
      </section>

      <nav
        className="sticky top-4 z-20 flex flex-wrap justify-center gap-3 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-full"
        aria-label="Secciones del portfolio"
      >
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-current={activeSection === id ? 'true' : undefined}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
              activeSection === id
                ? 'bg-orange-500 text-white'
                : 'bg-orange-700 text-white hover:bg-orange-600'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="w-full max-w-4xl space-y-16">
        <SobreMi />
        <Formacion />
        <Proyectos />
        <Intereses />
        <Contacto />
      </div>
    </>
  )
}
