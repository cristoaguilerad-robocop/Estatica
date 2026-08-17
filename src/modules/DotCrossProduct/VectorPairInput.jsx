function VecInput({ label, color, value, onChange }) {
  const handleField = (field) => (e) => {
    const val = e.target.value
    if (val === '' || val === '-' || /^-?\d*\.?\d*$/.test(val)) {
      onChange({ ...value, [field]: val })
    }
  }

  return (
    <div className="p-3 bg-gray-700 rounded-lg space-y-2">
      <p className="text-xs font-bold" style={{ color }}>Vector {label}</p>
      <div className="grid grid-cols-3 gap-2">
        {['x', 'y', 'z'].map((axis) => (
          <div key={axis} className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 text-center">{label}{axis}</label>
            <input
              type="text"
              inputMode="decimal"
              value={value[axis]}
              onChange={handleField(axis)}
              className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white text-center focus:outline-none"
              style={{ outlineColor: color }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function VectorPairInput({ vecA, vecB, onChangeA, onChangeB }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <VecInput label="A" color="#ef4444" value={vecA} onChange={onChangeA} />
      <VecInput label="B" color="#3b82f6" value={vecB} onChange={onChangeB} />
    </div>
  )
}
