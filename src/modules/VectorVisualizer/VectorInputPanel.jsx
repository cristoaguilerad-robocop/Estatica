const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308']
const COLOR_NAMES = ['Rojo', 'Azul', 'Verde', 'Amarillo']

function VectorRow({ index, vec, onChange, onRemove }) {
  const color = COLORS[index]
  const handleField = (field) => (e) => {
    const val = e.target.value
    if (val === '' || val === '-' || /^-?\d*\.?\d*$/.test(val)) {
      onChange(index, { ...vec, [field]: val })
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg">
      <span
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-gray-400 w-12 flex-shrink-0">
        V{index + 1} ({COLOR_NAMES[index]})
      </span>
      {['x', 'y', 'z'].map((axis) => (
        <div key={axis} className="flex items-center gap-1">
          <label className="text-xs text-gray-400">{axis}:</label>
          <input
            type="text"
            inputMode="decimal"
            value={vec[axis]}
            onChange={handleField(axis)}
            className="w-20 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      ))}
      <button
        onClick={() => onRemove(index)}
        className="ml-auto text-gray-500 hover:text-red-400 text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}

export default function VectorInputPanel({ vectors, onChange }) {
  const addVector = () => {
    if (vectors.length < 4) {
      onChange([...vectors, { x: '1', y: '0', z: '0' }])
    }
  }

  const updateVector = (i, v) => {
    const next = [...vectors]
    next[i] = v
    onChange(next)
  }

  const removeVector = (i) => {
    onChange(vectors.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          Vectores
        </h2>
        {vectors.length < 4 && (
          <button
            onClick={addVector}
            className="text-xs bg-cyan-700 hover:bg-cyan-600 text-white px-3 py-1 rounded"
          >
            + Agregar
          </button>
        )}
      </div>
      {vectors.map((v, i) => (
        <VectorRow
          key={i}
          index={i}
          vec={v}
          onChange={updateVector}
          onRemove={removeVector}
        />
      ))}
      {vectors.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">
          Agrega al menos un vector.
        </p>
      )}
    </div>
  )
}
