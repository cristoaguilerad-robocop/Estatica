function VectorInput({ label, color, value, onChange }) {
  const handleField = (field) => (e) => {
    const val = e.target.value
    if (val === '' || val === '-' || /^-?\d*\.?\d*$/.test(val)) {
      onChange({ ...value, [field]: val })
    }
  }

  return (
    <div className="p-3 bg-gray-700 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold text-${color}-400`}>{label}</span>
        <button
          onClick={() => onChange(null)}
          className="text-gray-500 hover:text-red-400 text-xl leading-none px-1"
        >
          ×
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['x', 'y', 'z'].map((axis) => (
          <div key={axis} className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 text-center">{axis}</label>
            <input
              type="text"
              inputMode="decimal"
              value={value[axis]}
              onChange={handleField(axis)}
              className={`w-full bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-sm text-white text-center focus:outline-none focus:border-${color}-500`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ForceMomentInput({ forces, moments, onForcesChange, onMomentsChange }) {
  const addForce = () => onForcesChange([...forces, { x: '0', y: '0', z: '0' }])
  const addMoment = () => onMomentsChange([...moments, { x: '0', y: '0', z: '0' }])

  const updateForce = (i, v) => {
    if (v === null) { onForcesChange(forces.filter((_, idx) => idx !== i)); return }
    const next = [...forces]; next[i] = v; onForcesChange(next)
  }
  const updateMoment = (i, v) => {
    if (v === null) { onMomentsChange(moments.filter((_, idx) => idx !== i)); return }
    const next = [...moments]; next[i] = v; onMomentsChange(next)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Fuerzas (N)</h2>
          <button onClick={addForce} className="text-xs bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded">
            + Fuerza
          </button>
        </div>
        {forces.map((f, i) => (
          <VectorInput key={i} label={`F${i + 1}`} value={f} onChange={(v) => updateForce(i, v)} color="green" />
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Momentos (N·m)</h2>
          <button onClick={addMoment} className="text-xs bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded">
            + Momento
          </button>
        </div>
        {moments.map((m, i) => (
          <VectorInput key={i} label={`M${i + 1}`} value={m} onChange={(v) => updateMoment(i, v)} color="purple" />
        ))}
      </div>
    </div>
  )
}
