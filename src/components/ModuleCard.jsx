import { Link } from 'react-router-dom'

export default function ModuleCard({ to, icon, title, description, color }) {
  return (
    <Link
      to={to}
      className={`block bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-${color}-400 hover:bg-gray-750 transition-all group`}
    >
      <div className={`text-4xl mb-3`}>{icon}</div>
      <h2 className={`text-lg font-semibold text-${color}-400 mb-2 group-hover:text-${color}-300`}>
        {title}
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </Link>
  )
}
