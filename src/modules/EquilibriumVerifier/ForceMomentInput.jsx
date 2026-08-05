function VectorInput({ label, value, onChange, color = 'cyan' }) {
  const handleField = (field) => (e) => {
    const val = e.target.value
    if (val === '' || val === '-' || /^-?\d*\.?\d*$/.test(val)) {
      onChange({ ...value, [field]: val })
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-700 rounded-lg">
      <span className={`text-xs font-bold w-20 flex-shrink-0 text-${color}-400`}>{label}</span>
      {['x', 'y', 'z'].map((axis) => (
        <div key={axis} className="flex items-center gap-1">
          <label className="text-xs text-gray-400">{axis}:</label>
          <input
            type="text"
            inputMode="decimal"
            value={value[axis]}
            onChange={handleField(axis)}
            className={`w-20 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-${color}-500`}
          />
        </div>
      ))}
      <button
        onClick={() => onChange(null)}
        className="ml-auto text-gray-500 hover:text-red-400 text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}

export default function ForceMomentInput({ forces, moments, onForcesChange, onMomentsChange }) {
  const addForce = () =>
    onForcesChange([...forces, { x: '0', y: '0', z: '0' }])
  const addMoment = () =>
    onMomentsChange([...moments, { x: '0', y: '0', z: '0' }])

  const updateForce = (i, v) => {
    if (v === null) { onForcesChange(forces.filter((_, idx) => idx !== i)); return }
    const next = [...forces]; next[i] = v; onForcesChange(next)
  }
  const updateMoment = (i, v) => {
    if (v === null) { onMomentsChange(moments.filter((_, idx) => idx !== i)); return }
    const next = [...moments]; next[i] = v; onMomentsChange(next)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Fuerzas (N)
          </h2>
          <button
            onClick={addForce}
            className="text-xs bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            + Fuerza
          </button>
        </div>
        {forces.map((f, i) => (
          <VectorInput
            key={i}
            label={`F${i + 1}`}
            value={f}
            onChange={(v) => updateForce(i, v)}
            color="green"
          />
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Momentos (N·m)
          </h2>
          <button
            onClick={addMoment}
            className="text-xs bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded"
          >
            + Momento
          </button>
        </div>
        {moments.map((m, i) => (
          <VectorInput
            key={i}
            label={`M${i + 1}`}
            value={m}
            onChange={(v) => updateMoment(i, v)}
            color="purple"
          />
        ))}
      </div>
    </div>
  )
}
