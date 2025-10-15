import PMT from '@/utils/PMT.js'

export default function useRepaymentCalculator () {
  function computeRepayment ({ amount, annualRate, paymentsPerYear, totalMonths }) {
    // Validate inputs
    const amountNum = Number(amount)
    const periodsPerYearNum = Number(paymentsPerYear)
    const totalMonthsNum = Number(totalMonths)
    const annualRateNum = Number(annualRate)

    if (!Number.isFinite(amountNum) || amountNum <= 0) return null
    if (!Number.isFinite(periodsPerYearNum) || periodsPerYearNum <= 0) return null
    if (!Number.isFinite(totalMonthsNum) || totalMonthsNum <= 0) return null
    if (!Number.isFinite(annualRateNum) || annualRateNum < 0) return null

    // Compute inputs
    const years = totalMonthsNum / 12
    const nper = Math.round(periodsPerYearNum * years)
    if (nper <= 0) return null

    const periodicRate = annualRateNum / periodsPerYearNum

    const repaymentPerPeriod = Math.abs(PMT(periodicRate, nper, amountNum))
    const repaymentTotal = repaymentPerPeriod * nper
    const interestRate = Number((annualRateNum * 100).toFixed(2))

    return {
      repaymentPerPeriod,
      repaymentTotal,
      interestRate,
    }
  }

  return { computeRepayment }
}
