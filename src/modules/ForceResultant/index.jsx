import { useState, useMemo } from 'react'
import ForceInputPanel from './ForceInputPanel'
import ForceTable from './ForceTable'
import EquilibriumBadge from './EquilibriumBadge'
import { fromSpherical, sumVectors } from '../../utils/vectorMath'

function parseForce(f) {
  const mag = parseFloat(f.mag) || 0
  const theta = parseFloat(f.theta) || 0
  const phi = parseFloat(f.phi) || 0
  const { x, y, z } = fromSpherical(mag, theta, phi)
  return { mag, theta, phi, x, y, z }
}

export default function ForceResultant() {
  const DEFAULTS = [
    { mag: '100', theta: '45', phi: '0' },
    { mag: '80', theta: '90', phi: '90' },
  ]
  const [rawForces, setRawForces] = useState(DEFAULTS)
  const reset = () => setRawForces(DEFAULTS)

  const forces = useMemo(() => rawForces.map(parseForce), [rawForces])
  const resultant = useMemo(
    () => (forces.length > 0 ? sumVectors(forces) : null),
    [forces]
  )

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 space-y-3 sm:space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Módulo 2 — Calculadora de Resultante</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            θ: ángulo polar (desde eje Z), φ: ángulo azimutal (desde eje X en plano XY).
          </p>
        </div>
        <button
          onClick={reset}
          className="flex-shrink-0 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg border border-gray-600 transition-colors"
        >
          ↺ Reiniciar
        </button>
      </div>

      <ForceInputPanel forces={rawForces} onChange={setRawForces} />
      <EquilibriumBadge resultant={resultant} />
      <ForceTable forces={forces} resultant={resultant} />
    </div>
  )
}
