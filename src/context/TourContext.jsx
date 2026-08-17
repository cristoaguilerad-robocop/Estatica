import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { tourSteps } from '../data/tourSteps'

const TourContext = createContext(null)

export function TourProvider({ children }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(false)
  const [steps, setSteps] = useState([])
  const [current, setCurrent] = useState(0)
  const [moduleLabel, setModuleLabel] = useState('')

  const startTour = useCallback((route, label) => {
    const s = tourSteps[route]
    if (!s || s.length === 0) return
    setSteps(s)
    setCurrent(0)
    setModuleLabel(label)
    setActive(true)
    navigate(route)
  }, [navigate])

  const next = useCallback(() => {
    setCurrent(c => {
      if (c < steps.length - 1) return c + 1
      setActive(false)
      return 0
    })
  }, [steps.length])

  const prev = useCallback(() => {
    setCurrent(c => Math.max(0, c - 1))
  }, [])

  const endTour = useCallback(() => {
    setActive(false)
    setCurrent(0)
  }, [])

  return (
    <TourContext.Provider value={{ active, steps, current, moduleLabel, startTour, next, prev, endTour }}>
      {children}
    </TourContext.Provider>
  )
}

export const useTour = () => useContext(TourContext)
