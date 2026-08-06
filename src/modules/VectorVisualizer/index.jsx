import { useState, useMemo } from 'react'
import VectorInputPanel from './VectorInputPanel'
import VectorScene3D from './VectorScene3D'
import VectorResultsTable from './VectorResultsTable'
import CoordSelector from './CoordSelector'
import { sumVectors } from '../../utils/vectorMath'

function parseVec(v) {
  return {
    x: parseFloat(v.x) || 0,
    y: parseFloat(v.y) || 0,
    z: parseFloat(v.z) || 0,
  }
}

export default function VectorVisualizer() {
  const DEFAULTS = [
    { x: '2', y: '1', z: '0' },
    { x: '0', y: '2', z: '1' },
  ]
  const [rawVectors, setRawVectors] = useState(DEFAULTS)
  const [coordMode, setCoordMode] = useState('cartesiano')

  const reset = () => { setRawVectors(DEFAULTS); setCoordMode('cartesiano') }

  const vectors = useMemo(() => rawVectors.map(parseVec), [rawVectors])
  const resultant = useMemo(
    () => (vectors.length > 0 ? sumVectors(vectors) : null),
    [vectors]
  )

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Módulo 1 — Visualizador de Vectores 3D</h1>
          <p className="text-gray-400 text-sm mt-1">
            Ingresa hasta 4 vectores y visualízalos en el espacio tridimensional.
          </p>
        </div>
        <button
          onClick={reset}
          className="flex-shrink-0 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg border border-gray-600 transition-colors"
        >
          ↺ Reiniciar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <VectorInputPanel vectors={rawVectors} onChange={setRawVectors} />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">
              Sistema de coordenadas
            </p>
            <CoordSelector mode={coordMode} onChange={setCoordMode} />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <VectorScene3D vectors={vectors} resultant={resultant} />
          <VectorResultsTable
            vectors={vectors}
            resultant={resultant}
            coordMode={coordMode}
          />
        </div>
      </div>
    </div>
  )
}
