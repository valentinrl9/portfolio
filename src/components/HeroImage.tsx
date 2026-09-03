'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function HeroImage() {
  const [saludando, setSaludando] = useState(false)

  return (
    <button
      onClick={() => setSaludando(prev => !prev)}
      className="relative w-36 h-52 mx-auto rounded-2xl border-2 border-orange-500 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
      aria-label={saludando ? 'Volver a la foto normal' : 'Ver foto saludando'}
      type="button"
    >
      <Image
        src="/img/valentin.png"
        alt="Valentín en pose normal"
        fill
        sizes="144px"
        className={`object-cover transition-opacity duration-500 ${
          saludando ? 'opacity-0' : 'opacity-100'
        }`}
        priority
      />
      <Image
        src="/img/valentin2.png"
        alt="Valentín saludando"
        fill
        sizes="144px"
        className={`object-cover transition-opacity duration-500 ${
          saludando ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </button>
  )
}
