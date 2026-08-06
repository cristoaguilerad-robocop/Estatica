import { useState, useMemo } from 'react'
import VectorPairInput from './VectorPairInput'
import StepByStep from './StepByStep'
import ProductScene3D from './ProductScene3D'

function parseVec(v) {
  return {
    x: parseFloat(v.x) || 0,
    y: parseFloat(v.y) || 0,
    z: parseFloat(v.z) || 0,
  }
}

export default function DotCrossProduct() {
  const DEFAULT_A = { x: '1', y: '0', z: '0' }
  const DEFAULT_B = { x: '0', y: '1', z: '0' }
  const [rawA, setRawA] = useState(DEFAULT_A)
  const [rawB, setRawB] = useState(DEFAULT_B)
  const reset = () => { setRawA(DEFAULT_A); setRawB(DEFAULT_B) }

  const a = useMemo(() => parseVec(rawA), [rawA])
  const b = useMemo(() => parseVec(rawB), [rawB])

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 space-y-4 sm:space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Módulo 4 — Producto Punto y Cruz</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Ingresa dos vectores A y B para calcular A·B y A×B con desarrollo paso a paso.
          </p>
        </div>
        <button
          onClick={reset}
          className="flex-shrink-0 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg border border-gray-600 transition-colors"
        >
          ↺ Reiniciar
        </button>
      </div>

      <VectorPairInput
        vecA={rawA}
        vecB={rawB}
        onChangeA={setRawA}
        onChangeB={setRawB}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <StepByStep a={a} b={b} />
        <ProductScene3D a={a} b={b} />
      </div>
    </div>
  )
}
