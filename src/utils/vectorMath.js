const EPS = 1e-10

export function magnitude(v) {
  return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2)
}

export function add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
}

export function sumVectors(vectors) {
  return vectors.reduce((acc, v) => add(acc, v), { x: 0, y: 0, z: 0 })
}

export function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

export function cross(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

export function angleBetween(a, b) {
  const magA = magnitude(a)
  const magB = magnitude(b)
  if (magA < EPS || magB < EPS) return 0
  const cosAngle = Math.max(-1, Math.min(1, dot(a, b) / (magA * magB)))
  return (Math.acos(cosAngle) * 180) / Math.PI
}

export function directionCosines(v) {
  const mag = magnitude(v)
  if (mag < EPS) return { alpha: 0, beta: 0, gamma: 0 }
  return {
    alpha: (Math.acos(v.x / mag) * 180) / Math.PI,
    beta: (Math.acos(v.y / mag) * 180) / Math.PI,
    gamma: (Math.acos(v.z / mag) * 180) / Math.PI,
  }
}

export function toSpherical(v) {
  const r = magnitude(v)
  if (r < EPS) return { r: 0, theta: 0, phi: 0 }
  const theta = (Math.acos(Math.max(-1, Math.min(1, v.z / r))) * 180) / Math.PI
  const phi = (Math.atan2(v.y, v.x) * 180) / Math.PI
  return { r, theta, phi: phi < 0 ? phi + 360 : phi }
}

export function toCylindrical(v) {
  const rho = Math.sqrt(v.x ** 2 + v.y ** 2)
  const phi = (Math.atan2(v.y, v.x) * 180) / Math.PI
  return { rho, phi: phi < 0 ? phi + 360 : phi, z: v.z }
}

export function fromSpherical(r, thetaDeg, phiDeg) {
  const theta = (thetaDeg * Math.PI) / 180
  const phi = (phiDeg * Math.PI) / 180
  return {
    x: r * Math.sin(theta) * Math.cos(phi),
    y: r * Math.sin(theta) * Math.sin(phi),
    z: r * Math.cos(theta),
  }
}

export function isZero(v, eps = 1e-6) {
  return Math.abs(v.x) < eps && Math.abs(v.y) < eps && Math.abs(v.z) < eps
}
