const MODES = ['cartesiano', 'cilíndrico', 'esférico']

export default function CoordSelector({ mode, onChange }) {
  return (
    <div className="flex gap-2">
      {MODES.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${
            mode === m
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
