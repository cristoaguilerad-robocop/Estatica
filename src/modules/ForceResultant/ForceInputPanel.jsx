const FIELDS = [
  { key: 'mag', label: '|F| (N)' },
  { key: 'theta', label: 'θ (°)' },
  { key: 'phi', label: 'φ (°)' },
]

function ForceRow({ index, force, onChange, onRemove }) {
  const handleField = (field) => (e) => {
    const val = e.target.value
    if (val === '' || val === '-' || /^-?\d*\.?\d*$/.test(val)) {
      onChange(index, { ...force, [field]: val })
    }
  }

  return (
    <div className="p-3 bg-gray-700 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-yellow-400">F{index + 1}</span>
        <button
          onClick={() => onRemove(index)}
          className="text-gray-500 hover:text-red-400 text-xl leading-none px-1"
        >
          ×
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {FIELDS.map(({ key, label }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 text-center whitespace-nowrap">{label}</label>
            <input
              type="text"
              inputMode="decimal"
              value={force[key]}
              onChange={handleField(key)}
              className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-yellow-500"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ForceInputPanel({ forces, onChange }) {
  const addForce = () => onChange([...forces, { mag: '100', theta: '45', phi: '0' }])
  const updateForce = (i, f) => { const next = [...forces]; next[i] = f; onChange(next) }
  const removeForce = (i) => onChange(forces.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Fuerzas</h2>
        <button
          onClick={addForce}
          className="text-xs bg-yellow-700 hover:bg-yellow-600 text-white px-3 py-1 rounded"
        >
          + Agregar
        </button>
      </div>
      {forces.map((f, i) => (
        <ForceRow key={i} index={i} force={f} onChange={updateForce} onRemove={removeForce} />
      ))}
      {forces.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">Agrega al menos una fuerza.</p>
      )}
    </div>
  )
}
