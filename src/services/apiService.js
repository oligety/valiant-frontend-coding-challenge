import axios from 'axios'

const apiService = () => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 10000,
  })

  function getLoanPurposes () {
    return apiClient.get('/loan-purposes')
  }

  function getRepaymentPeriods () {
    return apiClient.get('/requested-repayment-periods')
  }

  function getLoanTerms () {
    return apiClient.get('/requested-term-months')
  }

  return {
    getLoanPurposes,
    getRepaymentPeriods,
    getLoanTerms,
  }
}

export default apiService()
