'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import SobreMi from '../components/SobreMi'
import Proyectos from '../components/Proyectos'
import Intereses from '../components/Intereses'
import Contacto from '../components/Contacto'

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-950 via-black to-gray-900 text-white flex flex-col items-center px-8 py-16 space-y-24">

      {/* ✨ Hero Section */}
      <section className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          👋 ¡Hola! Soy <span className="text-orange-400">Valentin</span>
        </h1>

        <p className="text-xl mb-6">
          Creativo digital, desarrollador curioso y constructor de experiencias web que marcan.
        </p>

        <div className="relative w-35 h-52 mx-auto rounded-full border-2 border-orange-500 overflow-hidden imagen-hover">
          <img
            src="/img/valentin.png"
            alt="Valentin normal"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 hover:opacity-0"
          />
          <img
            src="/img/valentin2.png"
            alt="Valentin saludando"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 hover:opacity-100"
          />
        </div>

        <p className="text-xl mb-6">
          Soy desarrollador web en crecimiento, con experiencia en frontend y backend...
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <a
            href="/CV%20Valen%202025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border-2 border-orange-500 text-orange-600 font-semibold rounded-full transition-transform duration-300 hover:scale-105 hover:text-white hover:shadow-lg"
          >
            📄 Ver mi CV
          </a>
        </div>
      </section>

      {/* 🔘 Botones de navegación */}
      <section className="mt-16 flex flex-wrap justify-center gap-6">
        {[
          { section: 'sobre', label: '👤 Sobre mí' },
          { section: 'proyectos', label: '🛠️ Proyectos' },
          { section: 'intereses', label: '💡 Intereses' },
          { section: 'contacto', label: '📬 Contacto' },
        ].map(({ section, label }) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className="group bg-orange-700 text-white rounded-full overflow-hidden w-16 h-16 hover:px-6 hover:py-3 hover:w-auto transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            <span className="text-2xl mr-0 group-hover:mr-3 transition-all">{label.split(' ')[0]}</span>
            <span className="hidden group-hover:inline text-sm">{label.split(' ').slice(1).join(' ')}</span>
          </button>
        ))}
      </section>


      {/* 📦 Renderizado condicional de componentes */}
      <section className="w-full max-w-4xl">
        {activeSection === 'sobre' && <SobreMi />}
        {activeSection === 'proyectos' && <Proyectos />}
        {activeSection === 'intereses' && <Intereses />}
        {activeSection === 'contacto' && <Contacto />}
      </section>

    </main>
  )
}
