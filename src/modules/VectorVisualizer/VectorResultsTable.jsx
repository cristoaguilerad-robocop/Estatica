import { magnitude, directionCosines, toSpherical, toCylindrical } from '../../utils/vectorMath'
import { fmt, fmtAngle } from '../../utils/formatters'
import FormulaBox from '../../components/FormulaBox'

const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308']
const RESULTANT_COLOR = '#22d3ee'

function VectorRow({ label, v, color, coordMode }) {
  const mag = magnitude(v)
  const dc = directionCosines(v)
  const sph = toSpherical(v)
  const cyl = toCylindrical(v)

  return (
    <tr className="border-b border-gray-700">
      <td className="py-2 px-3">
        <span className="font-mono font-bold" style={{ color }}>
          {label}
        </span>
      </td>
      {coordMode === 'cartesiano' && (
        <>
          <td className="py-2 px-3 text-right font-mono text-sm">{fmt(v.x)}</td>
          <td className="py-2 px-3 text-right font-mono text-sm">{fmt(v.y)}</td>
          <td className="py-2 px-3 text-right font-mono text-sm">{fmt(v.z)}</td>
        </>
      )}
      {coordMode === 'cilíndrico' && (
        <>
          <td className="py-2 px-3 text-right font-mono text-sm">{fmt(cyl.rho)}</td>
          <td className="py-2 px-3 text-right font-mono text-sm">{fmtAngle(cyl.phi)}</td>
          <td className="py-2 px-3 text-right font-mono text-sm">{fmt(cyl.z)}</td>
        </>
      )}
      {coordMode === 'esférico' && (
        <>
          <td className="py-2 px-3 text-right font-mono text-sm">{fmt(sph.r)}</td>
          <td className="py-2 px-3 text-right font-mono text-sm">{fmtAngle(sph.theta)}</td>
          <td className="py-2 px-3 text-right font-mono text-sm">{fmtAngle(sph.phi)}</td>
        </>
      )}
      <td className="py-2 px-3 text-right font-mono text-sm text-cyan-300">{fmt(mag)}</td>
      <td className="py-2 px-3 text-right font-mono text-sm text-gray-300">
        {fmtAngle(dc.alpha)}
      </td>
      <td className="py-2 px-3 text-right font-mono text-sm text-gray-300">
        {fmtAngle(dc.beta)}
      </td>
      <td className="py-2 px-3 text-right font-mono text-sm text-gray-300">
        {fmtAngle(dc.gamma)}
      </td>
    </tr>
  )
}

const COORD_HEADERS = {
  cartesiano: ['x', 'y', 'z'],
  cilíndrico: ['ρ', 'φ', 'z'],
  esférico: ['r', 'θ', 'φ'],
}

export default function VectorResultsTable({ vectors, resultant, coordMode }) {
  if (vectors.length === 0) return null

  const headers = COORD_HEADERS[coordMode]

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="py-2 px-3 text-left">Vector</th>
              {headers.map((h) => (
                <th key={h} className="py-2 px-3 text-right">
                  {h}
                </th>
              ))}
              <th className="py-2 px-3 text-right text-cyan-400">|v|</th>
              <th className="py-2 px-3 text-right">α</th>
              <th className="py-2 px-3 text-right">β</th>
              <th className="py-2 px-3 text-right">γ</th>
            </tr>
          </thead>
          <tbody>
            {vectors.map((v, i) => (
              <VectorRow
                key={i}
                label={`V${i + 1}`}
                v={v}
                color={COLORS[i % COLORS.length]}
                coordMode={coordMode}
              />
            ))}
            {vectors.length > 1 && resultant && (
              <VectorRow
                label="R"
                v={resultant}
                color={RESULTANT_COLOR}
                coordMode={coordMode}
              />
            )}
          </tbody>
        </table>
      </div>

      <FormulaBox title="Fórmulas">
        <p>|v| = √(x² + y² + z²)</p>
        <p>cos α = x/|v|, cos β = y/|v|, cos γ = z/|v|</p>
        {coordMode === 'cilíndrico' && (
          <>
            <p>ρ = √(x² + y²), φ = atan2(y,x), z = z</p>
          </>
        )}
        {coordMode === 'esférico' && (
          <>
            <p>r = |v|, θ = acos(z/r), φ = atan2(y,x)</p>
          </>
        )}
      </FormulaBox>
    </div>
  )
}
