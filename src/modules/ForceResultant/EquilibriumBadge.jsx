import { magnitude } from '../../utils/vectorMath'
import { fmt } from '../../utils/formatters'

export default function EquilibriumBadge({ resultant }) {
  if (!resultant) return null
  const mag = magnitude(resultant)
  const inEquil = mag < 0.001

  return (
    <div
      className={`rounded-lg p-4 border ${
        inEquil
          ? 'bg-green-900/40 border-green-600 text-green-300'
          : 'bg-red-900/40 border-red-600 text-red-300'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{inEquil ? '✅' : '❌'}</span>
        <div>
          <p className="font-semibold text-sm">
            {inEquil ? 'Sistema en equilibrio' : 'Sistema NO está en equilibrio'}
          </p>
          <p className="text-xs opacity-80 mt-0.5">
            |ΣF| = {fmt(mag)} N
            {!inEquil && ` — Se requiere |ΣF| = 0`}
          </p>
        </div>
      </div>
    </div>
  )
}
