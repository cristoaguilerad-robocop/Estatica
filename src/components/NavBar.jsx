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
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-3 py-2 sm:px-6 sm:gap-2">
        <span className="text-cyan-400 font-bold text-sm sm:text-base tracking-wide whitespace-nowrap mr-2 sm:mr-4 flex-shrink-0">
          Estática ING 2204
        </span>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === to
                ? 'bg-cyan-700/40 text-cyan-300'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
