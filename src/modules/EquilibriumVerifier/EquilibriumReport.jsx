import { fmt } from '../../utils/formatters'
import { magnitude } from '../../utils/vectorMath'
import FormulaBox from '../../components/FormulaBox'

function Condition({ label, value, ok }) {
  const mag = magnitude(value)
  return (
    <div
      className={`rounded-lg p-4 border ${
        ok ? 'bg-green-900/30 border-green-700' : 'bg-red-900/30 border-red-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{ok ? '✅' : '❌'}</span>
          <span className={`font-mono font-bold ${ok ? 'text-green-300' : 'text-red-300'}`}>
            {label}
          </span>
        </div>
        <span className={`font-mono text-sm ${ok ? 'text-green-400' : 'text-red-400'}`}>
          |{label}| = {fmt(mag)}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs font-mono">
        {['x', 'y', 'z'].map((ax) => (
          <span key={ax} className="text-gray-400">
            {label}{ax.toUpperCase()} = {fmt(value[ax])}
          </span>
        ))}
      </div>
      {!ok && (
        <p className="text-xs text-red-400 mt-2">
          No se cumple la condición de equilibrio — {label} ≠ 0
        </p>
      )}
    </div>
  )
}

export default function EquilibriumReport({ sumF, sumM }) {
  const fOk = magnitude(sumF) < 0.001
  const mOk = magnitude(sumM) < 0.001
  const bothOk = fOk && mOk

  return (
    <div className="space-y-4">
      <div
        className={`rounded-xl p-4 border-2 text-center font-bold text-lg ${
          bothOk
            ? 'border-green-500 text-green-300 bg-green-900/20'
            : 'border-red-500 text-red-300 bg-red-900/20'
        }`}
      >
        {bothOk ? '✅ Cuerpo en Equilibrio Estático' : '❌ Cuerpo NO está en Equilibrio'}
      </div>

      <Condition label="ΣF" value={sumF} ok={fOk} />
      <Condition label="ΣM" value={sumM} ok={mOk} />

      <FormulaBox title="Condiciones de equilibrio (cuerpo rígido)">
        <p>ΣF = ΣFx·î + ΣFy·ĵ + ΣFz·k̂ = 0</p>
        <p>ΣM = ΣMx·î + ΣMy·ĵ + ΣMz·k̂ = 0</p>
      </FormulaBox>
    </div>
  )
}
