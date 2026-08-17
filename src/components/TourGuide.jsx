import { useEffect, useState, useCallback } from 'react'
import { useTour } from '../context/TourContext'

function useElementRect(elementId, active, current) {
  const [rect, setRect] = useState(null)

  const update = useCallback(() => {
    if (!elementId) { setRect(null); return }
    const el = document.querySelector(`[data-tour-id="${elementId}"]`)
    if (!el) { setRect(null); return }
    const r = el.getBoundingClientRect()
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
  }, [elementId])

  useEffect(() => {
    if (!active) { setRect(null); return }
    // Scroll then measure after animation
    const el = elementId && document.querySelector(`[data-tour-id="${elementId}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const t1 = setTimeout(update, 350)
    const t2 = setTimeout(update, 700)
    update()
    window.addEventListener('resize', update)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('resize', update)
    }
  }, [active, elementId, current, update])

  return rect
}

function Spotlight({ rect }) {
  if (!rect) return null
  const pad = 8
  return (
    <>
      {/* SVG mask overlay */}
      <svg
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 49, width: '100vw', height: '100vh' }}
        aria-hidden="true"
      >
        <defs>
          <mask id="tour-spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={rect.left - pad}
              y={rect.top - pad}
              width={rect.width + pad * 2}
              height={rect.height + pad * 2}
              rx="10"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.68)"
          mask="url(#tour-spotlight-mask)"
        />
      </svg>
      {/* Glow ring */}
      <div
        className="fixed pointer-events-none rounded-xl"
        style={{
          zIndex: 50,
          top: rect.top - pad,
          left: rect.left - pad,
          width: rect.width + pad * 2,
          height: rect.height + pad * 2,
          boxShadow: '0 0 0 2px #22d3ee, 0 0 24px rgba(34,211,238,0.35)',
        }}
      />
    </>
  )
}

export default function TourGuide() {
  const { active, steps, current, moduleLabel, next, prev, endTour } = useTour()
  const step = active ? steps[current] : null
  const rect = useElementRect(step?.elementId, active, current)

  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') endTour()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, next, prev, endTour])

  if (!active || !step) return null

  // Position card: bottom if rect is in top half, top otherwise
  const winH = window.innerHeight
  const cardOnBottom = !rect || rect.top < winH / 2
  const cardStyle = cardOnBottom
    ? { bottom: '1rem', right: '1rem' }
    : { top: '4.5rem', right: '1rem' }

  return (
    <>
      <Spotlight rect={rect} />

      {/* Dark backdrop if no rect (no element found) */}
      {!rect && (
        <div className="fixed inset-0 bg-black/60 pointer-events-none" style={{ zIndex: 49 }} />
      )}

      {/* Tour card */}
      <div
        className="fixed w-80 bg-gray-900 border border-cyan-500 rounded-2xl shadow-2xl"
        style={{ ...cardStyle, zIndex: 52 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-700">
          <span className="text-xs text-cyan-400 font-semibold truncate max-w-[180px]">{moduleLabel}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {current + 1} / {steps.length}
            </span>
            <button
              onClick={endTour}
              className="text-gray-500 hover:text-white text-lg leading-none ml-1"
              aria-label="Cerrar tour"
            >
              ×
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-gray-700">
          <div
            className="h-full bg-cyan-500 transition-all duration-300"
            style={{ width: `${((current + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-xl mt-0.5 flex-shrink-0">{step.icon}</span>
            <h3 className="font-semibold text-white text-sm leading-snug">{step.title}</h3>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed">{step.description}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 px-4 pb-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </button>
          {current < steps.length - 1 ? (
            <button
              onClick={next}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={endTour}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-green-600 hover:bg-green-500 text-white transition-colors"
            >
              ¡Listo! ✓
            </button>
          )}
        </div>

        <p className="text-center text-gray-600 text-[10px] pb-2">← → para navegar · Esc para salir</p>
      </div>
    </>
  )
}
