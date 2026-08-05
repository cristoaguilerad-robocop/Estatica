import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/vectores', label: 'Vectores 3D' },
  { to: '/fuerzas', label: 'Resultante' },
  { to: '/equilibrio', label: 'Equilibrio' },
  { to: '/productos', label: 'Dot & Cross' },
]

export default function NavBar() {
  const { pathname } = useLocation()
  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-6 flex-wrap">
      <span className="text-cyan-400 font-bold text-lg tracking-wide">
        Estática ING 2204
      </span>
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`text-sm font-medium transition-colors ${
            pathname === to
              ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
