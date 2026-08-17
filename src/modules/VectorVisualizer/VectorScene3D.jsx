import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid, Text } from '@react-three/drei'
import * as THREE from 'three'

const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308']
const RESULTANT_COLOR = '#22d3ee'

function Arrow({ from, to, color, label }) {
  const dir = useMemo(() => {
    const d = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2])
    return d
  }, [from, to])

  const length = dir.length()
  if (length < 0.001) return null

  const origin = useMemo(() => new THREE.Vector3(...from), [from])
  const arrow = useMemo(
    () => new THREE.ArrowHelper(dir.clone().normalize(), origin, length, color, 0.2, 0.12),
    [dir, origin, length, color]
  )

  const midpoint = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + 0.15, (from[2] + to[2]) / 2]

  return (
    <>
      <primitive object={arrow} />
      {label && (
        <Text position={midpoint} fontSize={0.2} color={color} anchorX="center" anchorY="middle">
          {label}
        </Text>
      )}
    </>
  )
}

function AxisLabels() {
  return (
    <>
      <Text position={[2.6, 0, 0]} fontSize={0.25} color="#f87171">X</Text>
      <Text position={[0, 2.6, 0]} fontSize={0.25} color="#86efac">Y</Text>
      <Text position={[0, 0, 2.6]} fontSize={0.25} color="#93c5fd">Z</Text>
    </>
  )
}

function Axes() {
  const axes = useMemo(() => {
    const group = new THREE.Group()
    const dirs = [
      [new THREE.Vector3(1, 0, 0), '#f87171'],
      [new THREE.Vector3(0, 1, 0), '#86efac'],
      [new THREE.Vector3(0, 0, 1), '#93c5fd'],
    ]
    dirs.forEach(([d, c]) => {
      group.add(new THREE.ArrowHelper(d, new THREE.Vector3(0, 0, 0), 2.5, c, 0.18, 0.1))
    })
    return group
  }, [])
  return <primitive object={axes} />
}

export default function VectorScene3D({ vectors, resultant }) {
  return (
    <div className="w-full h-52 sm:h-64 lg:h-72 rounded-xl overflow-hidden border border-gray-700">
      <Canvas camera={{ position: [5, 4, 5], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={['#111827']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enablePan enableZoom enableRotate />
        <Grid
          args={[10, 10]}
          cellColor="#374151"
          sectionColor="#4b5563"
          fadeDistance={20}
          position={[0, -0.01, 0]}
        />
        <Axes />
        <AxisLabels />
        {vectors.map((v, i) => (
          <Arrow
            key={i}
            from={[0, 0, 0]}
            to={[v.x, v.y, v.z]}
            color={COLORS[i % COLORS.length]}
            label={`V${i + 1}`}
          />
        ))}
        {resultant && vectors.length > 1 && (
          <Arrow
            from={[0, 0, 0]}
            to={[resultant.x, resultant.y, resultant.z]}
            color={RESULTANT_COLOR}
            label="R"
          />
        )}
      </Canvas>
    </div>
  )
}
