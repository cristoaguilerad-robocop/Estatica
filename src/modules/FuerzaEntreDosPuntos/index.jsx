import { useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Text } from '@react-three/drei'
import * as THREE from 'three'
import { magnitude, cross } from '../../utils/vectorMath'
import { fmt, fmtAngle } from '../../utils/formatters'
import FormulaBox from '../../components/FormulaBox'

function parsePoint(p) {
  return { x: parseFloat(p.x) || 0, y: parseFloat(p.y) || 0, z: parseFloat(p.z) || 0 }
}

function PointInput({ label, color, value, onChange }) {
  const handle = (axis) => (e) => {
    const v = e.target.value
    if (v === '' || v === '-' || /^-?\d*\.?\d*$/.test(v)) onChange({ ...value, [axis]: v })
  }
  return (
    <div className="p-3 bg-gray-700 rounded-lg space-y-2">
      <p className="text-xs font-bold" style={{ color }}>Punto {label}</p>
      <div className="grid grid-cols-3 gap-2">
        {['x', 'y', 'z'].map((ax) => (
          <div key={ax} className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 text-center">{ax}</label>
            <input
              type="text" inputMode="decimal" value={value[ax]} onChange={handle(ax)}
              className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-sm text-white text-center focus:outline-none"
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
  const arrow = useMemo(() => new THREE.ArrowHelper(dir.clone().normalize(), origin, len, color, 0.2, 0.12), [dir, origin, len, color])
  const mid = [(from[0]+to[0])/2, (from[1]+to[1])/2+0.2, (from[2]+to[2])/2]
  return (
    <>
      <primitive object={arrow} />
      <Text position={mid} fontSize={0.22} color={color} anchorX="center">{label}</Text>
    </>
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

function PointMarker({ pos, color, label }) {
  return (
    <>
      <mesh position={pos}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[pos[0]+0.15, pos[1]+0.15, pos[2]]} fontSize={0.2} color={color}>{label}</Text>
    </>
  )
}

export default function FuerzaEntreDosPuntos() {
  const DEFAULT_A = { x: '0', y: '0.2', z: '0' }
  const DEFAULT_B = { x: '0', y: '-0.2', z: '1' }
  const [rawA, setRawA] = useState(DEFAULT_A)
  const [rawB, setRawB] = useState(DEFAULT_B)
  const [magStr, setMagStr] = useState('10')
  const reset = () => { setRawA(DEFAULT_A); setRawB(DEFAULT_B); setMagStr('10') }

  const A = useMemo(() => parsePoint(rawA), [rawA])
  const B = useMemo(() => parsePoint(rawB), [rawB])

  const AB = useMemo(() => ({ x: B.x-A.x, y: B.y-A.y, z: B.z-A.z }), [A, B])
  const magAB = useMemo(() => magnitude(AB), [AB])
  const F_mag = parseFloat(magStr) || 0

  const unitAB = useMemo(() => magAB > 0.0001
    ? { x: AB.x/magAB, y: AB.y/magAB, z: AB.z/magAB }
    : { x: 0, y: 0, z: 0 }, [AB, magAB])

  const F = useMemo(() => ({
    x: F_mag * unitAB.x,
    y: F_mag * unitAB.y,
    z: F_mag * unitAB.z
  }), [F_mag, unitAB])

  const scale = Math.max(magAB, 1)

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 space-y-4 sm:space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Módulo 5 — Fuerza entre Dos Puntos</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Dado un segmento AB, calcula el vector unitario y la fuerza a lo largo de la línea.
          </p>
        </div>
        <button onClick={reset} className="flex-shrink-0 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg border border-gray-600 transition-colors">
          ↺ Reiniciar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <PointInput label="A (origen)" color="#f97316" value={rawA} onChange={setRawA} />
          <PointInput label="B (destino)" color="#a78bfa" value={rawB} onChange={setRawB} />
          <div className="p-3 bg-gray-700 rounded-lg space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Magnitud de la fuerza</p>
            <div className="flex items-center gap-2">
              <input
                type="text" inputMode="decimal" value={magStr}
                onChange={e => { const v=e.target.value; if(v===''||v==='-'||/^-?\d*\.?\d*$/.test(v)) setMagStr(v) }}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
              <span className="text-gray-400 text-sm whitespace-nowrap">N (o kN)</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Resultados */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-3">
            <h3 className="font-semibold text-white text-sm">Resultados</h3>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Vector AB = B − A</p>
              <p className="font-mono text-sm bg-gray-700 rounded p-2 text-orange-300">
                AB = ({fmt(AB.x)}, {fmt(AB.y)}, {fmt(AB.z)})
              </p>
              <p className="font-mono text-xs text-gray-400">|AB| = {fmt(magAB)}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Vector unitario û_AB</p>
              <p className="font-mono text-sm bg-gray-700 rounded p-2 text-purple-300">
                û = ({fmt(unitAB.x)}, {fmt(unitAB.y)}, {fmt(unitAB.z)})
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Fuerza F = |F| · û</p>
              <p className="font-mono text-sm bg-gray-700 rounded p-2 text-cyan-300">
                F = ({fmt(F.x)}, {fmt(F.y)}, {fmt(F.z)})
              </p>
            </div>
          </div>

          <FormulaBox title="Procedimiento">
            <p>AB⃗ = B − A</p>
            <p>û_AB = AB⃗ / |AB⃗|</p>
            <p>F⃗ = |F| · û_AB</p>
          </FormulaBox>
        </div>
      </div>

      {/* Vista 3D */}
      <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-gray-700">
        <Canvas camera={{ position: [3,3,3], fov: 45 }} gl={{ antialias: true }}>
          <color attach="background" args={['#111827']} />
          <ambientLight intensity={0.6} />
          <pointLight position={[5,5,5]} />
          <OrbitControls />
          <Grid args={[6,6]} cellColor="#374151" sectionColor="#4b5563" position={[0,-0.01,0]} />
          <Axes />
          <PointMarker pos={[A.x,A.y,A.z]} color="#f97316" label="A" />
          <PointMarker pos={[B.x,B.y,B.z]} color="#a78bfa" label="B" />
          <Arrow3D from={[A.x,A.y,A.z]} to={[B.x,B.y,B.z]} color="#f97316" label="AB" />
          {F_mag > 0 && magnitude(F) > 0.001 && (
            <Arrow3D
              from={[A.x,A.y,A.z]}
              to={[A.x+F.x/F_mag*scale*0.8, A.y+F.y/F_mag*scale*0.8, A.z+F.z/F_mag*scale*0.8]}
              color="#22d3ee"
              label="F"
            />
          )}
        </Canvas>
      </div>
    </div>
  )
}
