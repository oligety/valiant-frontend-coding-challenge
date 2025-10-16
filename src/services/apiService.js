import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
})

export function getLoanPurposes () {
  return apiClient.get('/loan-purposes')
}

export function getRepaymentPeriods () {
  return apiClient.get('/requested-repayment-periods')
}

export function getLoanTerms () {
  return apiClient.get('/requested-term-months')
}
