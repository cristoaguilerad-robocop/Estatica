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
  const [rawA, setRawA] = useState({ x: '1', y: '0', z: '0' })
  const [rawB, setRawB] = useState({ x: '0', y: '1', z: '0' })

  const a = useMemo(() => parseVec(rawA), [rawA])
  const b = useMemo(() => parseVec(rawB), [rawB])

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Módulo 4 — Producto Punto y Cruz</h1>
        <p className="text-gray-400 text-sm mt-1">
          Ingresa dos vectores A y B para calcular A·B y A×B con desarrollo paso a paso.
        </p>
      </div>

      <VectorPairInput
        vecA={rawA}
        vecB={rawB}
        onChangeA={setRawA}
        onChangeB={setRawB}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StepByStep a={a} b={b} />
        <ProductScene3D a={a} b={b} />
      </div>
    </div>
  )
}
