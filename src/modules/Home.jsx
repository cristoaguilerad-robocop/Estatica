import ModuleCard from '../components/ModuleCard'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Estática — ING 2204
      </h1>
      <p className="text-gray-400 text-sm sm:text-base mb-8 sm:mb-10">
        Universidad de Los Andes · Herramientas interactivas para estudiar
        equilibrio, fuerzas y vectores.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <ModuleCard
          to="/vectores"
          icon="🧭"
          title="Módulo 1 — Visualizador de vectores 3D"
          description="Ingresa hasta 4 vectores (x, y, z), visualízalos en 3D y calcula la resultante. Muestra magnitud, ángulos directores y coordenadas cilíndricas/esféricas."
          color="cyan"
        />
        <ModuleCard
          to="/fuerzas"
          icon="⚡"
          title="Módulo 2 — Calculadora de resultante"
          description="Ingresa N fuerzas con magnitud y ángulos (θ, φ). Descompone en componentes, calcula la resultante y verifica equilibrio."
          color="yellow"
        />
        <ModuleCard
          to="/equilibrio"
          icon="⚖️"
          title="Módulo 3 — Verificador de equilibrio"
          description="Verifica si ΣF = 0 y ΣM = 0 para un cuerpo rígido. Muestra el diagrama de cuerpo libre e indica qué condición falla."
          color="green"
        />
        <ModuleCard
          to="/productos"
          icon="✖️"
          title="Módulo 4 — Producto punto y cruz"
          description="Calcula A·B y A×B con desarrollo paso a paso. Muestra el ángulo entre vectores y grafica el producto cruz en 3D."
          color="purple"
        />
      </div>
    </div>
  )
}
