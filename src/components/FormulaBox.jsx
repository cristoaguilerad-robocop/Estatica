export default function FormulaBox({ title, children }) {
  return (
    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
      {title && (
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">
          {title}
        </p>
      )}
      <div className="font-mono text-sm text-cyan-300 space-y-1">{children}</div>
    </div>
  )
}
