export const tourModules = [
  { route: '/vectores',     label: 'Módulo 1 — Vectores 3D',          icon: '🧭' },
  { route: '/fuerzas',      label: 'Módulo 2 — Resultante de Fuerzas', icon: '⚡' },
  { route: '/equilibrio',   label: 'Módulo 3 — Equilibrio',            icon: '⚖️' },
  { route: '/productos',    label: 'Módulo 4 — Dot & Cross',           icon: '✖️' },
  { route: '/fuerza-linea', label: 'Módulo 5 — Fuerza en Línea',       icon: '🎯' },
  { route: '/normal-plano', label: 'Módulo 6 — Normal al Plano',       icon: '📐' },
  { route: '/momento',      label: 'Módulo 7 — Momento de Fuerza',     icon: '🔄' },
]

export const tourSteps = {
  '/vectores': [
    {
      elementId: 'tour-vec-inputs',
      icon: '✏️',
      title: 'Ingreso de vectores',
      description: 'Escribe las componentes x, y, z de cada vector. Pulsa "+ Agregar" para añadir hasta 4 vectores. El color identifica cada uno en la vista 3D.',
    },
    {
      elementId: 'tour-vec-coord',
      icon: '🔄',
      title: 'Sistema de coordenadas',
      description: 'Alterna entre cartesiano, cilíndrico y esférico. La tabla de resultados cambia automáticamente al sistema seleccionado.',
    },
    {
      elementId: 'tour-vec-canvas',
      icon: '🌐',
      title: 'Vista 3D interactiva',
      description: 'Los vectores y la resultante (cian) se grafican en tiempo real. Arrastra para rotar la vista y usa el scroll para hacer zoom.',
    },
    {
      elementId: 'tour-vec-table',
      icon: '📊',
      title: 'Tabla de resultados',
      description: 'Muestra la magnitud, los ángulos directores (α, β, γ) y las coordenadas de cada vector. La última fila es la resultante de todos los vectores.',
    },
  ],

  '/fuerzas': [
    {
      elementId: 'tour-fuerza-inputs',
      icon: '✏️',
      title: 'Ingreso de fuerzas',
      description: 'Ingresa la magnitud |F| y los ángulos θ (polar, desde Z) y φ (azimutal, desde X). La fuerza se convierte automáticamente a componentes x, y, z.',
    },
    {
      elementId: 'tour-fuerza-badge',
      icon: '⚖️',
      title: 'Estado de equilibrio',
      description: 'Indica si la suma de todas las fuerzas es aproximadamente cero. Verde = equilibrio, rojo = desequilibrio. Útil para verificar sistemas de fuerzas.',
    },
    {
      elementId: 'tour-fuerza-tabla',
      icon: '📊',
      title: 'Tabla de componentes',
      description: 'Muestra Fx, Fy y Fz para cada fuerza. La fila de resultante suma todas las componentes. Úsala para verificar tus cálculos manualmente.',
    },
  ],

  '/equilibrio': [
    {
      elementId: 'tour-eq-inputs',
      icon: '✏️',
      title: 'Fuerzas y momentos',
      description: 'Ingresa las componentes x, y, z de cada fuerza y cada momento aplicado al cuerpo. Puedes agregar o quitar filas según el problema.',
    },
    {
      elementId: 'tour-eq-dcl',
      icon: '🗂️',
      title: 'Diagrama de cuerpo libre',
      description: 'Representación simplificada del cuerpo con las fuerzas (verde) y momentos (violeta) ingresados. Las flechas son proporcionales a la magnitud.',
    },
    {
      elementId: 'tour-eq-report',
      icon: '✅',
      title: 'Reporte de equilibrio',
      description: 'Verifica ΣF = 0 y ΣM = 0. Verde = condición cumplida, rojo = no se cumple. Muestra el valor numérico de cada suma para identificar qué falla.',
    },
  ],

  '/productos': [
    {
      elementId: 'tour-dc-inputs',
      icon: '✏️',
      title: 'Vectores A y B',
      description: 'Ingresa las componentes de los dos vectores. Los resultados y la vista 3D se actualizan al instante.',
    },
    {
      elementId: 'tour-dc-steps',
      icon: '🧮',
      title: 'Desarrollo paso a paso',
      description: 'Muestra el cálculo completo de A·B (producto punto) y A×B (producto cruz), el ángulo entre los vectores y la interpretación geométrica.',
    },
    {
      elementId: 'tour-dc-canvas',
      icon: '🌐',
      title: 'Vista 3D del producto cruz',
      description: 'Visualiza A (rojo), B (azul) y A×B (violeta). El vector A×B siempre es perpendicular al plano formado por A y B.',
    },
  ],

  '/fuerza-linea': [
    {
      elementId: 'tour-fl-puntos',
      icon: '📍',
      title: 'Puntos A y B',
      description: 'Define el segmento ingresando las coordenadas del punto de origen A y el punto de destino B en el espacio 3D.',
    },
    {
      elementId: 'tour-fl-mag',
      icon: '💪',
      title: 'Magnitud de la fuerza',
      description: 'Ingresa el valor escalar de la fuerza en N o kN. El vector resultante F = |F| · û_AB mantiene esa magnitud en la dirección del segmento.',
    },
    {
      elementId: 'tour-fl-results',
      icon: '📊',
      title: 'Resultados',
      description: 'Muestra el vector AB, el vector unitario û_AB (magnitud = 1) y la fuerza descompuesta en sus tres componentes cartesianas.',
    },
    {
      elementId: 'tour-fl-canvas',
      icon: '🌐',
      title: 'Vista 3D',
      description: 'Visualiza los puntos A y B, la dirección del segmento (naranja) y el vector fuerza F escalado (cyan) desde el punto A.',
    },
  ],

  '/normal-plano': [
    {
      elementId: 'tour-np-inputs',
      icon: '📍',
      title: 'Tres puntos del plano',
      description: 'Define el plano ingresando las coordenadas de tres puntos A, B y C no colineales. Deben estar en el mismo plano cuya normal quieres calcular.',
    },
    {
      elementId: 'tour-np-steps',
      icon: '🧮',
      title: 'Desarrollo paso a paso',
      description: 'Calcula los vectores AB y BC que están contenidos en el plano, luego n = AB×BC (perpendicular a ambos), y finalmente n̂ = n/|n|.',
    },
    {
      elementId: 'tour-np-canvas',
      icon: '🌐',
      title: 'Vista 3D del plano',
      description: 'Muestra el triángulo formado por A, B, C (plano translúcido verde), los vectores AB y BC, y el vector normal n̂ desde el centroide del triángulo.',
    },
  ],

  '/momento': [
    {
      elementId: 'tour-mo-inputs',
      icon: '📍',
      title: 'Punto O, punto A y fuerza F',
      description: 'O es el punto de referencia donde se calcula el momento. A es donde se aplica la fuerza F. Ingresa las componentes de cada uno.',
    },
    {
      elementId: 'tour-mo-steps',
      icon: '🧮',
      title: 'Desarrollo paso a paso',
      description: 'Calcula r = A−O (vector de posición), expande el determinante para M = r×F, y muestra cada componente Mx, My, Mz con la magnitud |M| en N·m.',
    },
    {
      elementId: 'tour-mo-canvas',
      icon: '🌐',
      title: 'Vista 3D del momento',
      description: 'Visualiza r (naranja), la fuerza F (rojo) aplicada en A, y el momento M (verde) desde O. M es perpendicular al plano formado por r y F.',
    },
  ],
}
