export function formatCurrency (value) {
  if (typeof value !== 'number') {
    return value
  }
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    roundingMode: 'ceil',
  }).format(value)
}
