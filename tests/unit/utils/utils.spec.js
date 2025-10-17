import { formatCurrency } from '@/utils/utils.js'

describe('formatCurrency', () => {
  it('returns the expected result for 1000', () => {
    const result = formatCurrency(1000)
    expect(result).toEqual('$1,000')
  })
  it('returns the expected result for 42', () => {
    const result = formatCurrency(42)
    expect(result).toEqual('$42')
  })
  it('returns the expected result for 1000000', () => {
    const result = formatCurrency(1000000)
    expect(result).toEqual('$1,000,000')
  })
  it('returns same value if not number', () => {
    const result = formatCurrency('This is not a number')
    expect(result).toEqual('This is not a number')
  })
})
