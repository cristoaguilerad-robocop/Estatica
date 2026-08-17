import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './modules/Home'
import VectorVisualizer from './modules/VectorVisualizer'
import ForceResultant from './modules/ForceResultant'
import EquilibriumVerifier from './modules/EquilibriumVerifier'
import DotCrossProduct from './modules/DotCrossProduct'
import FuerzaEntreDosPuntos from './modules/FuerzaEntreDosPuntos'
import NormalPlano from './modules/NormalPlano'
import MomentoFuerza from './modules/MomentoFuerza'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar />
      <main className="py-4 sm:py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vectores" element={<VectorVisualizer />} />
          <Route path="/fuerzas" element={<ForceResultant />} />
          <Route path="/equilibrio" element={<EquilibriumVerifier />} />
          <Route path="/productos" element={<DotCrossProduct />} />
          <Route path="/fuerza-linea" element={<FuerzaEntreDosPuntos />} />
          <Route path="/normal-plano" element={<NormalPlano />} />
          <Route path="/momento" element={<MomentoFuerza />} />
        </Routes>
      </main>
    </div>
  )
}
