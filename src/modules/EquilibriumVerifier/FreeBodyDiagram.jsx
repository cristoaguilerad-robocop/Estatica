import { magnitude } from '../../utils/vectorMath'

const CX = 160
const CY = 160
const MAX_LEN = 90

function scaleVectors(vecs) {
  const maxMag = Math.max(...vecs.map(magnitude), 0.001)
  return vecs.map((v) => {
    const scale = (magnitude(v) / maxMag) * MAX_LEN
    return { ...v, scale }
  })
}

function Arrow2D({ dx, dy, color, label }) {
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len < 1) return null
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI
  const tx = CX + dx + (dx / len) * 12
  const ty = CY + dy + (dy / len) * 12

  return (
    <g>
      <line
        x1={CX}
        y1={CY}
        x2={CX + dx}
        y2={CY + dy}
        stroke={color}
        strokeWidth={2.5}
        markerEnd={`url(#arrow-${color.replace('#', '')})`}
      />
      <text x={tx} y={ty} fill={color} fontSize={11} textAnchor="middle" dominantBaseline="middle">
        {label}
      </text>
    </g>
  )
}

export default function FreeBodyDiagram({ forces, moments }) {
  const scaledForces = scaleVectors(forces)

  const forceColors = ['#22c55e', '#86efac', '#4ade80', '#16a34a']
  const momentColors = ['#a855f7', '#d8b4fe', '#c084fc', '#9333ea']

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-semibold">
        Diagrama de Cuerpo Libre (simplificado)
      </p>
      <svg width="320" height="320" viewBox="0 0 320 320" className="mx-auto">
        <defs>
          {[...forceColors, ...momentColors].map((c) => (
            <marker
              key={c}
              id={`arrow-${c.replace('#', '')}`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L8,3 z" fill={c} />
            </marker>
          ))}
        </defs>

        {/* Grid */}
        <line x1={0} y1={160} x2={320} y2={160} stroke="#374151" strokeWidth={1} />
        <line x1={160} y1={0} x2={160} y2={320} stroke="#374151" strokeWidth={1} />
        <text x={315} y={155} fill="#6b7280" fontSize={10}>X</text>
        <text x={165} y={10} fill="#6b7280" fontSize={10}>Y</text>

        {/* Body */}
        <rect x={130} y={130} width={60} height={60} rx={6} fill="#1f2937" stroke="#6b7280" strokeWidth={2} />
        <text x={160} y={163} fill="#9ca3af" fontSize={10} textAnchor="middle">Cuerpo</text>

        {/* Forces (project onto XY plane for 2D display) */}
        {scaledForces.map((f, i) => (
          <Arrow2D
            key={i}
            dx={(f.x / (magnitude(f) || 1)) * f.scale}
            dy={-(f.y / (magnitude(f) || 1)) * f.scale}
            color={forceColors[i % forceColors.length]}
            label={`F${i + 1}`}
          />
        ))}

        {/* Moments as arcs (simplified: show as curved arrow indicator) */}
        {moments.map((m, i) => {
          const mz = parseFloat(m.z) || 0
          if (Math.abs(mz) < 0.001) return null
          const r = 50 + i * 10
          const sweep = mz > 0 ? 1 : 0
          return (
            <g key={i}>
              <path
                d={`M ${CX + r} ${CY} A ${r} ${r} 0 0 ${sweep} ${CX - r} ${CY}`}
                fill="none"
                stroke={momentColors[i % momentColors.length]}
                strokeWidth={2}
                strokeDasharray="4 3"
              />
              <text
                x={CX + (mz > 0 ? r + 14 : -(r + 14))}
                y={CY - 8}
                fill={momentColors[i % momentColors.length]}
                fontSize={11}
                textAnchor="middle"
              >
                M{i + 1}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
