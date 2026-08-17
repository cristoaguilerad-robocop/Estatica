import { useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Text } from '@react-three/drei'
import * as THREE from 'three'
import { cross, magnitude } from '../../utils/vectorMath'
import { fmt } from '../../utils/formatters'
import FormulaBox from '../../components/FormulaBox'

function parsePoint(p) {
  return { x: parseFloat(p.x)||0, y: parseFloat(p.y)||0, z: parseFloat(p.z)||0 }
}

function PointInput({ label, color, value, onChange }) {
  const handle = (ax) => (e) => {
    const v = e.target.value
    if (v===''||v==='-'||/^-?\d*\.?\d*$/.test(v)) onChange({ ...value, [ax]: v })
  }
  return (
    <div className="p-2 bg-gray-700 rounded-lg space-y-1.5">
      <p className="text-xs font-bold" style={{ color }}>Punto {label}</p>
      <div className="grid grid-cols-3 gap-2">
        {['x','y','z'].map(ax => (
          <div key={ax} className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 text-center">{ax}</label>
            <input type="text" inputMode="decimal" value={value[ax]} onChange={handle(ax)}
              className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white text-center focus:outline-none"
              style={{ outlineColor: color }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Arrow3D({ from, to, color, label }) {
  const dir = useMemo(() => new THREE.Vector3(to[0]-from[0], to[1]-from[1], to[2]-from[2]), [from, to])
  const len = dir.length()
  if (len < 0.001) return null
  const origin = useMemo(() => new THREE.Vector3(...from), [from])
  const arrow = useMemo(() => new THREE.ArrowHelper(dir.clone().normalize(), origin, len, color, 0.18, 0.1), [dir, origin, len, color])
  const mid = [(from[0]+to[0])/2+0.1, (from[1]+to[1])/2+0.2, (from[2]+to[2])/2]
  return (
    <>
      <primitive object={arrow} />
      <Text position={mid} fontSize={0.2} color={color} anchorX="center">{label}</Text>
    </>
  )
}

function PointMarker({ pos, color, label }) {
  return (
    <>
      <mesh position={pos}>
        <sphereGeometry args={[0.08,16,16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[pos[0]+0.15,pos[1]+0.15,pos[2]]} fontSize={0.2} color={color}>{label}</Text>
    </>
  )
}

function PlaneViz({ A, B, C }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      A.x,A.y,A.z, B.x,B.y,B.z, C.x,C.y,C.z
    ])
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geo.computeVertexNormals()
    return geo
  }, [A, B, C])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#22c55e" side={THREE.DoubleSide} transparent opacity={0.35} />
    </mesh>
  )
}

function Axes() {
  const axes = useMemo(() => {
    const g = new THREE.Group()
    ;[[new THREE.Vector3(1,0,0),'#f87171'],[new THREE.Vector3(0,1,0),'#86efac'],[new THREE.Vector3(0,0,1),'#93c5fd']]
      .forEach(([d,c]) => g.add(new THREE.ArrowHelper(d, new THREE.Vector3(), 2, c, 0.15, 0.09)))
    return g
  }, [])
  return <primitive object={axes} />
}

export default function NormalPlano() {
  const DEFAULT = {
    A: { x: '0.2', y: '0', z: '0' },
    B: { x: '0', y: '0.2', z: '0' },
    C: { x: '0', y: '-0.2', z: '1' },
  }
  const [rawA, setRawA] = useState(DEFAULT.A)
  const [rawB, setRawB] = useState(DEFAULT.B)
  const [rawC, setRawC] = useState(DEFAULT.C)
  const reset = () => { setRawA(DEFAULT.A); setRawB(DEFAULT.B); setRawC(DEFAULT.C) }

  const A = useMemo(() => parsePoint(rawA), [rawA])
  const B = useMemo(() => parsePoint(rawB), [rawB])
  const C = useMemo(() => parsePoint(rawC), [rawC])

  const AB = useMemo(() => ({ x:B.x-A.x, y:B.y-A.y, z:B.z-A.z }), [A, B])
  const BC = useMemo(() => ({ x:C.x-B.x, y:C.y-B.y, z:C.z-B.z }), [B, C])
  const n  = useMemo(() => cross(AB, BC), [AB, BC])
  const magN = useMemo(() => magnitude(n), [n])
  const nUnit = useMemo(() => magN > 0.0001
    ? { x:n.x/magN, y:n.y/magN, z:n.z/magN }
    : { x:0, y:0, z:0 }, [n, magN])

  // Centro del triángulo para dibujar la normal
  const centroid = { x:(A.x+B.x+C.x)/3, y:(A.y+B.y+C.y)/3, z:(A.z+B.z+C.z)/3 }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 space-y-3 sm:space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Módulo 6 — Vector Normal a un Plano</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Dados tres puntos A, B y C, calcula el vector normal al plano que los contiene.
          </p>
        </div>
        <button onClick={reset} className="flex-shrink-0 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg border border-gray-600 transition-colors">
          ↺ Reiniciar
        </button>
      </div>

      <div data-tour-id="tour-np-inputs" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PointInput label="A" color="#f87171" value={rawA} onChange={setRawA} />
        <PointInput label="B" color="#60a5fa" value={rawB} onChange={setRawB} />
        <PointInput label="C" color="#a78bfa" value={rawC} onChange={setRawC} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div data-tour-id="tour-np-steps" className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-4">
          <h3 className="font-semibold text-white text-sm">Desarrollo paso a paso</h3>

          <div className="font-mono text-sm bg-gray-700 rounded p-3 space-y-1">
            <p className="text-xs text-gray-400 mb-2 font-sans uppercase tracking-wider">Paso 1: Vectores en el plano</p>
            <p className="text-red-300">AB = B−A = ({fmt(AB.x)}, {fmt(AB.y)}, {fmt(AB.z)})</p>
            <p className="text-blue-300">BC = C−B = ({fmt(BC.x)}, {fmt(BC.y)}, {fmt(BC.z)})</p>
          </div>

          <div className="font-mono text-sm bg-gray-700 rounded p-3 space-y-1">
            <p className="text-xs text-gray-400 mb-2 font-sans uppercase tracking-wider">Paso 2: Producto cruzado n = AB × BC</p>
            <p className="text-gray-300">i: ({fmt(AB.y)})({fmt(BC.z)}) − ({fmt(AB.z)})({fmt(BC.y)}) = {fmt(n.x)}</p>
            <p className="text-gray-300">j: −[({fmt(AB.x)})({fmt(BC.z)}) − ({fmt(AB.z)})({fmt(BC.x)})] = {fmt(n.y)}</p>
            <p className="text-gray-300">k: ({fmt(AB.x)})({fmt(BC.y)}) − ({fmt(AB.y)})({fmt(BC.x)}) = {fmt(n.z)}</p>
            <p className="text-green-300 font-bold mt-1">n = ({fmt(n.x)}, {fmt(n.y)}, {fmt(n.z)})</p>
          </div>

          <div className="font-mono text-sm bg-gray-700 rounded p-3 space-y-1">
            <p className="text-xs text-gray-400 mb-2 font-sans uppercase tracking-wider">Paso 3: Vector unitario n̂</p>
            <p className="text-gray-300">|n| = √({fmt(n.x)}² + {fmt(n.y)}² + {fmt(n.z)}²) = {fmt(magN)}</p>
            <p className="text-cyan-300 font-bold">n̂ = ({fmt(nUnit.x)}, {fmt(nUnit.y)}, {fmt(nUnit.z)})</p>
          </div>

          <FormulaBox title="Fórmulas">
            <p>n⃗ = AB⃗ × BC⃗</p>
            <p>n̂ = n⃗ / |n⃗|</p>
            <p>|n̂| = 1 (verificación)</p>
          </FormulaBox>
        </div>

        <div data-tour-id="tour-np-canvas" className="w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-gray-700">
          <Canvas camera={{ position: [2.5,2.5,2.5], fov: 45 }} gl={{ antialias: true }}>
            <color attach="background" args={['#111827']} />
            <ambientLight intensity={0.6} />
            <pointLight position={[5,5,5]} />
            <OrbitControls />
            <Grid args={[6,6]} cellColor="#374151" sectionColor="#4b5563" position={[0,-0.01,0]} />
            <Axes />
            <PlaneViz A={A} B={B} C={C} />
            <PointMarker pos={[A.x,A.y,A.z]} color="#f87171" label="A" />
            <PointMarker pos={[B.x,B.y,B.z]} color="#60a5fa" label="B" />
            <PointMarker pos={[C.x,C.y,C.z]} color="#a78bfa" label="C" />
            {/* AB y BC */}
            <Arrow3D from={[A.x,A.y,A.z]} to={[B.x,B.y,B.z]} color="#f87171" label="AB" />
            <Arrow3D from={[B.x,B.y,B.z]} to={[C.x,C.y,C.z]} color="#60a5fa" label="BC" />
            {/* Normal desde centroide */}
            {magN > 0.001 && (
              <Arrow3D
                from={[centroid.x,centroid.y,centroid.z]}
                to={[centroid.x+nUnit.x*0.8, centroid.y+nUnit.y*0.8, centroid.z+nUnit.z*0.8]}
                color="#22d3ee"
                label="n̂"
              />
            )}
          </Canvas>
        </div>
      </div>
    </div>
  )
}
