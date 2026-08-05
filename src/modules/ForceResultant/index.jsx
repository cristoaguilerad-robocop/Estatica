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
  const [rawForces, setRawForces] = useState([
    { mag: '100', theta: '45', phi: '0' },
    { mag: '80', theta: '90', phi: '90' },
  ])

  const forces = useMemo(() => rawForces.map(parseForce), [rawForces])
  const resultant = useMemo(
    () => (forces.length > 0 ? sumVectors(forces) : null),
    [forces]
  )

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Módulo 2 — Calculadora de Resultante</h1>
        <p className="text-gray-400 text-sm mt-1">
          θ: ángulo polar (desde eje Z), φ: ángulo azimutal (desde eje X en plano XY).
        </p>
      </div>

      <ForceInputPanel forces={rawForces} onChange={setRawForces} />
      <EquilibriumBadge resultant={resultant} />
      <ForceTable forces={forces} resultant={resultant} />
    </div>
  )
}
