import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Text } from '@react-three/drei'
import * as THREE from 'three'
import { cross, magnitude } from '../../utils/vectorMath'

function Arrow({ from, to, color, label }) {
  const dir = useMemo(() => {
    return new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2])
  }, [from, to])
  const len = dir.length()
  if (len < 0.001) return null
  const origin = useMemo(() => new THREE.Vector3(...from), [from])
  const arrow = useMemo(
    () => new THREE.ArrowHelper(dir.clone().normalize(), origin, len, color, 0.2, 0.12),
    [dir, origin, len, color]
  )
  const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + 0.2, (from[2] + to[2]) / 2]
  return (
    <>
      <primitive object={arrow} />
      <Text position={mid} fontSize={0.22} color={color} anchorX="center" anchorY="middle">
        {label}
      </Text>
    </>
  )
}

function Axes() {
  const axes = useMemo(() => {
    const g = new THREE.Group()
    ;[
      [new THREE.Vector3(1, 0, 0), '#f87171'],
      [new THREE.Vector3(0, 1, 0), '#86efac'],
      [new THREE.Vector3(0, 0, 1), '#93c5fd'],
    ].forEach(([d, c]) => g.add(new THREE.ArrowHelper(d, new THREE.Vector3(), 2, c, 0.15, 0.09)))
    return g
  }, [])
  return <primitive object={axes} />
}

export default function ProductScene3D({ a, b }) {
  const c = useMemo(() => cross(a, b), [a, b])

  return (
    <div className="w-full h-80 rounded-xl overflow-hidden border border-gray-700">
      <Canvas camera={{ position: [5, 4, 5], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={['#111827']} />
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <Grid args={[10, 10]} cellColor="#374151" sectionColor="#4b5563" position={[0, -0.01, 0]} />
        <Axes />
        <Arrow from={[0, 0, 0]} to={[a.x, a.y, a.z]} color="#ef4444" label="A" />
        <Arrow from={[0, 0, 0]} to={[b.x, b.y, b.z]} color="#3b82f6" label="B" />
        {magnitude(c) > 0.001 && (
          <Arrow from={[0, 0, 0]} to={[c.x, c.y, c.z]} color="#a855f7" label="A×B" />
        )}
      </Canvas>
    </div>
  )
}
