import PMT from '@/utils/PMT.js'

/**
 * Check if a number is finite and positive
 * @param {number} n - Number to validate
 * @returns {boolean}
 */
function isFinitePositiveNumber (n) {
  return Number.isFinite(n) && n > 0
}

/**
 * Calculate loan repayment details
 * @param {Object} params - Calculation parameters
 * @param {number} params.amount - Loan amount
 * @param {number} params.annualRate - Annual interest rate (as decimal, e.g., 0.05 for 5%)
 * @param {number} params.paymentsPerYear - Number of payments per year
 * @param {number} params.totalMonths - Total loan term in months
 * @returns {Object|null} Repayment details or null if calculation fails
 */
function computeRepayment ({ amount, annualRate, paymentsPerYear, totalMonths }) {
  try {
    // Coerce inputs
    const amountNum = Number(amount)
    const periodsPerYearNum = Number(paymentsPerYear)
    const totalMonthsNum = Number(totalMonths)
    const annualRateNum = Number(annualRate)

    // Validate numeric ranges
    if (!isFinitePositiveNumber(amountNum)) return null
    if (!isFinitePositiveNumber(periodsPerYearNum)) return null
    if (!isFinitePositiveNumber(totalMonthsNum)) return null
    if (!Number.isFinite(annualRateNum) || annualRateNum < 0) return null

    // Derived values
    const years = totalMonthsNum / 12
    const nper = Math.round(periodsPerYearNum * years)
    if (!Number.isFinite(nper) || nper <= 0) return null

    const periodicRate = annualRateNum / periodsPerYearNum
    if (!Number.isFinite(periodicRate)) return null

    // Guard: avoid NaN/Infinity from extreme inputs
    if (Math.abs(periodicRate) > 1e6 || nper > 1e6) return null

    // Safe PMT computation
    let repaymentPerPeriod
    try {
      repaymentPerPeriod = Math.abs(PMT(periodicRate, nper, amountNum))
    } catch {
      return null
    }

    if (!Number.isFinite(repaymentPerPeriod)) return null

    const repaymentTotal = repaymentPerPeriod * nper
    if (!Number.isFinite(repaymentTotal)) return null

    const interestRate = Number((annualRateNum * 100).toFixed(2))

    return {
      repaymentPerPeriod,
      repaymentTotal,
      interestRate,
    }
  } catch {
    // Any unexpected error results in a safe null
    return null
  }
}

export default {
  computeRepayment,
}
