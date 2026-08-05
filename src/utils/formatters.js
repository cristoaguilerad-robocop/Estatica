export function fmt(n, decimals = 3) {
  if (n === undefined || n === null || isNaN(n)) return '—'
  return parseFloat(n.toFixed(decimals)).toString()
}

export function fmtAngle(deg) {
  return fmt(deg, 1) + '°'
}
