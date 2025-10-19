import PMT from '@/utils/PMT'

describe('PMT', () => {
  it('returns the expected result', () => {
    const result = PMT(0.1 / 12, 24, 30000)
    expect(Math.trunc(result)).toEqual(-1384)
  })

  it('returns the expected result when the rate is 0', () => {
    const result = PMT(0, 24, 30000)
    expect(Math.trunc(result)).toEqual(-1250)
  })
})
