import { describe, it, beforeEach, expect } from 'vitest'

describe('calculatorService', () => {
  let calculatorService

  beforeEach(async () => {
    calculatorService = (await import('@/services/calculatorService.js')).default
  })

  it('returns expected results with valid input parameters', () => {
    const calculationResult = calculatorService.computeRepayment(
      { amount: 1000, annualRate: 0.1, paymentsPerYear: 2, totalMonths: 12 })
    expect(calculationResult).toEqual({
      interestRate: 10,
      repaymentPerPeriod: 537.8048780487803,
      repaymentTotal: 1075.6097560975606,
    })
  })

  it('returns null with invalid input parameters', () => {
    const calculationResult = calculatorService.computeRepayment(
      'invalid')
    expect(calculationResult).toEqual(null)
  })

  it('returns null with invalid amount parameter', () => {
    const calculationResult = calculatorService.computeRepayment(
      { amount: 'invalid', annualRate: 0.1, paymentsPerYear: 2, totalMonths: 12 })
    expect(calculationResult).toEqual(null)
  })

  it('returns null with invalid annualRate parameter', () => {
    const calculationResult = calculatorService.computeRepayment(
      { amount: 1000, annualRate: 'invalid', paymentsPerYear: 2, totalMonths: 12 })
    expect(calculationResult).toEqual(null)
  })

  it('returns null with invalid paymentsPerYear parameter', () => {
    const calculationResult = calculatorService.computeRepayment(
      { amount: 1000, annualRate: 0.1, paymentsPerYear: 'invalid', totalMonths: 12 })
    expect(calculationResult).toEqual(null)
  })

  it('returns null with invalid totalMonths parameter', () => {
    const calculationResult = calculatorService.computeRepayment(
      { amount: 1000, annualRate: 0.1, paymentsPerYear: 2, totalMonths: 'invalid' })
    expect(calculationResult).toEqual(null)
  })
})
