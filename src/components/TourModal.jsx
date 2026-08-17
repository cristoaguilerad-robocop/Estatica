import { tourModules } from '../data/tourSteps'
import { useTour } from '../context/TourContext'

export default function TourModal({ onClose }) {
  const { startTour } = useTour()

  const handleSelect = (route, label) => {
    onClose()
    startTour(route, label)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-gray-900 border border-cyan-600 rounded-2xl shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-700">
          <div>
            <h2 className="text-white font-bold text-base">🎓 Tour Interactivo</h2>
            <p className="text-gray-400 text-xs mt-0.5">Selecciona el módulo que quieres explorar</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl leading-none">×</button>
        </div>

        <div className="p-3 space-y-1.5 max-h-[70vh] overflow-y-auto">
          {tourModules.map(({ route, label, icon }) => (
            <button
              key={route}
              onClick={() => handleSelect(route, label)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cyan-900/40 border border-transparent hover:border-cyan-700 transition-all text-left group"
            >
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{label}</p>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  {tourStepCount(route)} pasos
                </p>
              </div>
              <span className="ml-auto text-gray-600 group-hover:text-cyan-400 transition-colors text-sm">→</span>
            </button>
          ))}
        </div>

        <div className="px-5 pb-4 pt-2 border-t border-gray-800">
          <p className="text-gray-600 text-xs text-center">El tour te guiará por cada sección con un spotlight visual</p>
        </div>
      </div>
    </div>
  )
}

import { tourSteps } from '../data/tourSteps'
function tourStepCount(route) {
  return tourSteps[route]?.length ?? 0
}
