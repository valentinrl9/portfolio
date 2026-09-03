import { getCertificadosAgrupados, getTitulos, hasFormacion } from '../data/portfolio'

const Formacion = () => {
  const titulos = getTitulos()
  const certificados = getCertificadosAgrupados()
  if (!hasFormacion()) return null

  return (
    <section
      id="formacion"
      className="py-12 px-6 bg-black border-4 border-orange-500 rounded-2xl text-white max-w-6xl mx-auto scroll-mt-28"
      aria-label="Formación académica y certificados"
    >
      <h2 className="text-3xl font-bold text-center mb-10">Formación</h2>

      {titulos.length > 0 && (
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-orange-400 mb-4">Formación académica</h3>
          <ul className="space-y-3" role="list">
            {titulos.map((t) => (
              <li
                key={t.nombre}
                className="bg-gray-900 border border-orange-500/40 rounded-lg p-4"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <strong>{t.nombre}</strong>
                  {t.fecha && <span className="text-sm text-gray-400">{t.fecha}</span>}
                </div>
                {t.centro && <p className="text-sm text-gray-300 mt-1">{t.centro}</p>}
                {t.url && (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-400 underline mt-2 inline-block"
                  >
                    Ver documento
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {certificados.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold text-orange-400 mb-4">Certificados y cursos</h3>
          <ul className="grid gap-3 md:grid-cols-2" role="list">
            {certificados.map((c) => (
              <li
                key={c.nombre}
                className="bg-gray-900 border border-orange-500/40 rounded-lg p-4"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <strong>{c.nombre}</strong>
                  {c.fecha && <span className="text-sm text-gray-400">{c.fecha}</span>}
                </div>
                {c.emisor && <p className="text-sm text-gray-300 mt-1">{c.emisor}</p>}
                {c.urls.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {c.urls.map((url, i) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-400 underline"
                      >
                        {c.urls.length > 1 ? `Ver documento ${i + 1}` : 'Ver certificado'}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Formacion
