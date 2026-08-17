import { useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Text } from '@react-three/drei'
import * as THREE from 'three'
import { cross, magnitude } from '../../utils/vectorMath'
import { fmt } from '../../utils/formatters'
import FormulaBox from '../../components/FormulaBox'

function parseVec(v) {
  return { x: parseFloat(v.x)||0, y: parseFloat(v.y)||0, z: parseFloat(v.z)||0 }
}

function VecInput({ label, color, value, onChange, subtitle }) {
  const handle = (ax) => (e) => {
    const v = e.target.value
    if (v===''||v==='-'||/^-?\d*\.?\d*$/.test(v)) onChange({ ...value, [ax]: v })
  }
  return (
    <div className="p-2 bg-gray-700 rounded-lg space-y-1.5">
      <div>
        <p className="text-xs font-bold" style={{ color }}>{label}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
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
  const arrow = useMemo(() => new THREE.ArrowHelper(dir.clone().normalize(), origin, len, color, 0.2, 0.12), [dir, origin, len, color])
  const mid = [(from[0]+to[0])/2+0.1,(from[1]+to[1])/2+0.2,(from[2]+to[2])/2]
  return (
    <>
      <primitive object={arrow} />
      <Text position={mid} fontSize={0.22} color={color} anchorX="center">{label}</Text>
    </>
  )
}

function PointMarker({ pos, color, label }) {
  return (
    <>
      <mesh position={pos}>
        <sphereGeometry args={[0.09,16,16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[pos[0]+0.15,pos[1]+0.15,pos[2]]} fontSize={0.2} color={color}>{label}</Text>
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

export default function MomentoFuerza() {
  const DEFAULT = {
    O: { x:'0', y:'0', z:'0' },
    A: { x:'1', y:'0', z:'0' },
    F: { x:'0', y:'0', z:'10' },
  }
  const [rawO, setRawO] = useState(DEFAULT.O)
  const [rawA, setRawA] = useState(DEFAULT.A)
  const [rawF, setRawF] = useState(DEFAULT.F)
  const reset = () => { setRawO(DEFAULT.O); setRawA(DEFAULT.A); setRawF(DEFAULT.F) }

  const O = useMemo(() => parseVec(rawO), [rawO])
  const A = useMemo(() => parseVec(rawA), [rawA])
  const F = useMemo(() => parseVec(rawF), [rawF])

  // r = A - O (vector de posición desde O hasta A)
  const r = useMemo(() => ({ x:A.x-O.x, y:A.y-O.y, z:A.z-O.z }), [O, A])
  // M = r × F
  const M = useMemo(() => cross(r, F), [r, F])
  const magR = useMemo(() => magnitude(r), [r])
  const magF = useMemo(() => magnitude(F), [F])
  const magM = useMemo(() => magnitude(M), [M])

  // Escalar F para visualización
  const F_scale = magF > 0.001 ? Math.min(magF, 3) / magF : 0
  const M_scale = magM > 0.001 ? Math.min(magM, 3) / magM : 0

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 space-y-3 sm:space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Módulo 7 — Momento de una Fuerza</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Calcula el momento M = r × F respecto a un punto O.
          </p>
        </div>
        <button onClick={reset} className="flex-shrink-0 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg border border-gray-600 transition-colors">
          ↺ Reiniciar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <VecInput label="Punto O" subtitle="(punto de referencia)" color="#94a3b8" value={rawO} onChange={setRawO} />
        <VecInput label="Punto A" subtitle="(aplicación de la fuerza)" color="#fb923c" value={rawA} onChange={setRawA} />
        <VecInput label="Fuerza F" subtitle="(componentes en N)" color="#f43f5e" value={rawF} onChange={setRawF} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Paso a paso */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-4">
          <h3 className="font-semibold text-white text-sm">Desarrollo paso a paso</h3>

          <div className="font-mono text-sm bg-gray-700 rounded p-3 space-y-1">
            <p className="text-xs text-gray-400 mb-1 font-sans uppercase tracking-wider">Paso 1: Vector de posición r = A − O</p>
            <p className="text-orange-300">r = ({fmt(A.x)}−{fmt(O.x)}, {fmt(A.y)}−{fmt(O.y)}, {fmt(A.z)}−{fmt(O.z)})</p>
            <p className="text-orange-300 font-bold">r = ({fmt(r.x)}, {fmt(r.y)}, {fmt(r.z)})</p>
            <p className="text-gray-400 text-xs">|r| = {fmt(magR)} m</p>
          </div>

          <div className="font-mono text-sm bg-gray-700 rounded p-3 space-y-1">
            <p className="text-xs text-gray-400 mb-1 font-sans uppercase tracking-wider">Paso 2: M = r × F (determinante)</p>
            <p className="text-gray-300 text-xs">| î   ĵ   k̂ |</p>
            <p className="text-gray-300 text-xs">| {fmt(r.x)} {fmt(r.y)} {fmt(r.z)} |</p>
            <p className="text-gray-300 text-xs">| {fmt(F.x)} {fmt(F.y)} {fmt(F.z)} |</p>
            <div className="mt-2 space-y-0.5 text-xs">
              <p className="text-gray-300">Mx = ({fmt(r.y)})({fmt(F.z)}) − ({fmt(r.z)})({fmt(F.y)}) = {fmt(M.x)}</p>
              <p className="text-gray-300">My = ({fmt(r.z)})({fmt(F.x)}) − ({fmt(r.x)})({fmt(F.z)}) = {fmt(M.y)}</p>
              <p className="text-gray-300">Mz = ({fmt(r.x)})({fmt(F.y)}) − ({fmt(r.y)})({fmt(F.x)}) = {fmt(M.z)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-700 rounded p-3">
              <p className="text-xs text-gray-400 mb-1">Momento M (N·m)</p>
              <p className="font-mono text-xs text-green-300">({fmt(M.x)}, {fmt(M.y)}, {fmt(M.z)})</p>
            </div>
            <div className="bg-gray-700 rounded p-3">
              <p className="text-xs text-gray-400 mb-1">|M|</p>
              <p className="font-mono text-xl font-bold text-green-300">{fmt(magM)}</p>
              <p className="text-xs text-gray-500">N·m</p>
            </div>
          </div>

          <FormulaBox title="Fórmulas">
            <p>r⃗ = A − O</p>
            <p>M⃗ = r⃗ × F⃗</p>
            <p>|M⃗| = |r⃗||F⃗|sin(θ)</p>
          </FormulaBox>
        </div>

        {/* Vista 3D */}
        <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-gray-700">
          <Canvas camera={{ position: [3,3,3], fov: 45 }} gl={{ antialias: true }}>
            <color attach="background" args={['#111827']} />
            <ambientLight intensity={0.6} />
            <pointLight position={[5,5,5]} />
            <OrbitControls />
            <Grid args={[6,6]} cellColor="#374151" sectionColor="#4b5563" position={[0,-0.01,0]} />
            <Axes />
            {/* Punto O */}
            <PointMarker pos={[O.x,O.y,O.z]} color="#94a3b8" label="O" />
            {/* Punto A */}
            <PointMarker pos={[A.x,A.y,A.z]} color="#fb923c" label="A" />
            {/* Vector r */}
            <Arrow3D from={[O.x,O.y,O.z]} to={[A.x,A.y,A.z]} color="#fb923c" label="r" />
            {/* Fuerza F desde A */}
            {magF > 0.001 && (
              <Arrow3D
                from={[A.x,A.y,A.z]}
                to={[A.x+F.x*F_scale, A.y+F.y*F_scale, A.z+F.z*F_scale]}
                color="#f43f5e"
                label="F"
              />
            )}
            {/* Momento M desde O */}
            {magM > 0.001 && (
              <Arrow3D
                from={[O.x,O.y,O.z]}
                to={[O.x+M.x*M_scale, O.y+M.y*M_scale, O.z+M.z*M_scale]}
                color="#22c55e"
                label="M"
              />
            )}
          </Canvas>
        </div>
      </div>
    </div>
  )
}
