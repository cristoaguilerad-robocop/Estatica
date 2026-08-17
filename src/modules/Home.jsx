import ModuleCard from '../components/ModuleCard'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
        Estática — ING 2204
      </h1>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
        Universidad de Los Andes · Herramientas interactivas para estudiar
        equilibrio, fuerzas y vectores.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <ModuleCard
          to="/fuerza-linea"
          icon="🎯"
          title="Módulo 5 — Fuerza entre dos puntos"
          description="Dado un segmento AB y una magnitud, calcula el vector unitario û_AB y la fuerza F = |F|·û_AB a lo largo de la línea."
          color="orange"
        />
        <ModuleCard
          to="/normal-plano"
          icon="📐"
          title="Módulo 6 — Vector normal a un plano"
          description="Dados tres puntos A, B, C en el espacio, calcula el vector normal al plano usando n = AB × BC y su vector unitario n̂."
          color="red"
        />
        <ModuleCard
          to="/momento"
          icon="🔄"
          title="Módulo 7 — Momento de una fuerza"
          description="Calcula el momento M = r × F respecto a un punto O. Muestra el desarrollo con determinante y grafica el momento en 3D."
          color="green"
        />
      </div>
    </div>
  )
}
