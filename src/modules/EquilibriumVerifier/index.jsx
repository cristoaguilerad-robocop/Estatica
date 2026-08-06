import { useState, useMemo } from 'react'
import ForceMomentInput from './ForceMomentInput'
import FreeBodyDiagram from './FreeBodyDiagram'
import EquilibriumReport from './EquilibriumReport'
import { sumVectors } from '../../utils/vectorMath'

function parseVec(v) {
  return {
    x: parseFloat(v.x) || 0,
    y: parseFloat(v.y) || 0,
    z: parseFloat(v.z) || 0,
  }
}

export default function EquilibriumVerifier() {
  const DEFAULT_FORCES = [
    { x: '10', y: '0', z: '0' },
    { x: '-10', y: '0', z: '0' },
  ]
  const DEFAULT_MOMENTS = [
    { x: '0', y: '0', z: '5' },
    { x: '0', y: '0', z: '-5' },
  ]
  const [rawForces, setRawForces] = useState(DEFAULT_FORCES)
  const [rawMoments, setRawMoments] = useState(DEFAULT_MOMENTS)
  const reset = () => { setRawForces(DEFAULT_FORCES); setRawMoments(DEFAULT_MOMENTS) }

  const forces = useMemo(() => rawForces.map(parseVec), [rawForces])
  const moments = useMemo(() => rawMoments.map(parseVec), [rawMoments])
  const sumF = useMemo(
    () => (forces.length ? sumVectors(forces) : { x: 0, y: 0, z: 0 }),
    [forces]
  )
  const sumM = useMemo(
    () => (moments.length ? sumVectors(moments) : { x: 0, y: 0, z: 0 }),
    [moments]
  )

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Módulo 3 — Verificador de Equilibrio</h1>
          <p className="text-gray-400 text-sm mt-1">
            Ingresa fuerzas y momentos aplicados al cuerpo. Se verifica ΣF = 0 y ΣM = 0.
          </p>
        </div>
        <button
          onClick={reset}
          className="flex-shrink-0 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg border border-gray-600 transition-colors"
        >
          ↺ Reiniciar
        </button>
      </div>

      <ForceMomentInput
        forces={rawForces}
        moments={rawMoments}
        onForcesChange={setRawForces}
        onMomentsChange={setRawMoments}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FreeBodyDiagram forces={forces} moments={moments} />
        <EquilibriumReport sumF={sumF} sumM={sumM} />
      </div>
    </div>
  )
}
