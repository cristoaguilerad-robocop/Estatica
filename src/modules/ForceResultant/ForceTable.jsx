import { magnitude } from '../../utils/vectorMath'
import { fmt } from '../../utils/formatters'
import FormulaBox from '../../components/FormulaBox'

export default function ForceTable({ forces, resultant }) {
  if (forces.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="py-2 px-3 text-left">Fuerza</th>
              <th className="py-2 px-3 text-right">|F| (N)</th>
              <th className="py-2 px-3 text-right">θ (°)</th>
              <th className="py-2 px-3 text-right">φ (°)</th>
              <th className="py-2 px-3 text-right text-red-400">Fx</th>
              <th className="py-2 px-3 text-right text-green-400">Fy</th>
              <th className="py-2 px-3 text-right text-blue-400">Fz</th>
            </tr>
          </thead>
          <tbody>
            {forces.map((f, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="py-2 px-3 font-mono font-bold text-yellow-400">F{i + 1}</td>
                <td className="py-2 px-3 text-right font-mono">{fmt(f.mag)}</td>
                <td className="py-2 px-3 text-right font-mono">{fmt(f.theta)}</td>
                <td className="py-2 px-3 text-right font-mono">{fmt(f.phi)}</td>
                <td className="py-2 px-3 text-right font-mono text-red-300">{fmt(f.x)}</td>
                <td className="py-2 px-3 text-right font-mono text-green-300">{fmt(f.y)}</td>
                <td className="py-2 px-3 text-right font-mono text-blue-300">{fmt(f.z)}</td>
              </tr>
            ))}
            {resultant && (
              <tr className="bg-gray-700 border-t-2 border-cyan-600">
                <td className="py-2 px-3 font-mono font-bold text-cyan-400">ΣF (R)</td>
                <td className="py-2 px-3 text-right font-mono text-cyan-300">
                  {fmt(magnitude(resultant))}
                </td>
                <td className="py-2 px-3" colSpan={2} />
                <td className="py-2 px-3 text-right font-mono text-red-300">{fmt(resultant.x)}</td>
                <td className="py-2 px-3 text-right font-mono text-green-300">{fmt(resultant.y)}</td>
                <td className="py-2 px-3 text-right font-mono text-blue-300">{fmt(resultant.z)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <FormulaBox title="Descomposición (coord. esféricas)">
        <p>Fx = F·sin(θ)·cos(φ)</p>
        <p>Fy = F·sin(θ)·sin(φ)</p>
        <p>Fz = F·cos(θ)</p>
        <p>R = √(ΣFx² + ΣFy² + ΣFz²)</p>
      </FormulaBox>
    </div>
  )
}
