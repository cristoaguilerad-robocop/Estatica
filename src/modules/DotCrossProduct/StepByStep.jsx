import { dot, cross, magnitude, angleBetween } from '../../utils/vectorMath'
import { fmt, fmtAngle } from '../../utils/formatters'
import FormulaBox from '../../components/FormulaBox'

export default function StepByStep({ a, b }) {
  const dotResult = dot(a, b)
  const crossResult = cross(a, b)
  const angle = angleBetween(a, b)
  const magA = magnitude(a)
  const magB = magnitude(b)
  const magCross = magnitude(crossResult)

  return (
    <div className="space-y-4">
      {/* Dot product */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-3">
        <h3 className="font-semibold text-white">Producto Punto A · B</h3>
        <FormulaBox title="Fórmula">
          <p>A · B = Ax·Bx + Ay·By + Az·Bz</p>
          <p>A · B = |A||B|·cos(θ)</p>
        </FormulaBox>
        <div className="font-mono text-sm bg-gray-700 rounded p-3 space-y-1">
          <p className="text-gray-300">
            A · B = ({fmt(a.x)})({fmt(b.x)}) + ({fmt(a.y)})({fmt(b.y)}) + ({fmt(a.z)})({fmt(b.z)})
          </p>
          <p className="text-gray-300">
            A · B = {fmt(a.x * b.x)} + {fmt(a.y * b.y)} + {fmt(a.z * b.z)}
          </p>
          <p className="text-cyan-300 font-bold text-base">A · B = {fmt(dotResult)}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-700 rounded p-3">
            <p className="text-xs text-gray-400 mb-1">Ángulo entre vectores</p>
            <p className="font-mono text-xl font-bold text-yellow-300">{fmtAngle(angle)}</p>
            <p className="font-mono text-xs text-gray-400">
              cos(θ) = {fmt(dotResult)} / ({fmt(magA)} · {fmt(magB)})
            </p>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <p className="text-xs text-gray-400 mb-1">|A| · |B|</p>
            <p className="font-mono text-sm text-gray-300">
              {fmt(magA)} · {fmt(magB)} = {fmt(magA * magB)}
            </p>
          </div>
        </div>
      </div>

      {/* Cross product */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-3">
        <h3 className="font-semibold text-white">Producto Cruz A × B</h3>
        <FormulaBox title="Fórmula (determinante)">
          <p>A × B = | î  ĵ  k̂ |</p>
          <p>        | Ax Ay Az|</p>
          <p>        | Bx By Bz|</p>
        </FormulaBox>
        <div className="font-mono text-sm bg-gray-700 rounded p-3 space-y-1">
          <p className="text-gray-300">
            î: ({fmt(a.y)})({fmt(b.z)}) − ({fmt(a.z)})({fmt(b.y)}) = {fmt(crossResult.x)}
          </p>
          <p className="text-gray-300">
            ĵ: −[({fmt(a.x)})({fmt(b.z)}) − ({fmt(a.z)})({fmt(b.x)})] = {fmt(crossResult.y)}
          </p>
          <p className="text-gray-300">
            k̂: ({fmt(a.x)})({fmt(b.y)}) − ({fmt(a.y)})({fmt(b.x)}) = {fmt(crossResult.z)}
          </p>
          <p className="text-purple-300 font-bold text-base">
            A × B = ({fmt(crossResult.x)}, {fmt(crossResult.y)}, {fmt(crossResult.z)})
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-700 rounded p-3">
            <p className="text-xs text-gray-400 mb-1">|A × B|</p>
            <p className="font-mono text-xl font-bold text-purple-300">{fmt(magCross)}</p>
            <p className="font-mono text-xs text-gray-400">= |A||B|·sin(θ)</p>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <p className="text-xs text-gray-400 mb-1">Verificación |A||B|·sin(θ)</p>
            <p className="font-mono text-sm text-gray-300">
              {fmt(magA)} · {fmt(magB)} · sin({fmtAngle(angle)}) ={' '}
              {fmt(magA * magB * Math.sin((angle * Math.PI) / 180))}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
