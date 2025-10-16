import { vi, describe, it, beforeEach, expect, afterEach } from 'vitest'

vi.mock('axios', () => {
  const get = vi.fn()
  const mockApiClient = { get }
  return { default: { create: vi.fn(() => mockApiClient) } }
})

describe('apiService', () => {
  let mockApiClient
  let apiService

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    const axiosDefault = (await import('axios')).default
    apiService = (await import('@/services/apiService.js')).default

    // Verify axios.create was called
    expect(axiosDefault.create).toHaveBeenCalledTimes(1)
    expect(axiosDefault.create).toHaveBeenCalledWith({
      baseURL: '',
      timeout: 10000,
    })

    // Safely get the mock client
    const createResults = axiosDefault.create.mock.results
    expect(createResults.length).toBeGreaterThan(0)
    mockApiClient = createResults[0].value
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getLoanPurposes', () => {
    it('calls apiClient.get with correct path and returns response', async () => {
      const mockData = [
        { label: 'Day-to-day capital', value: 'general', annualRate: 0.1 },
        { label: 'Vehicle or transport', value: 'vehicle', annualRate: 0.045 },
        { label: 'Financing a property', value: 'property', annualRate: 0.029 },
      ]
      mockApiClient.get.mockResolvedValue({ data: mockData })

      const res = await apiService.getLoanPurposes()

      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
      expect(mockApiClient.get).toHaveBeenCalledWith('/loan-purposes')
      expect(res).toEqual({ data: mockData })
    })

    it('propagates errors from apiClient.get', async () => {
      const error = new Error('Network error')
      mockApiClient.get.mockRejectedValue(error)

      await expect(apiService.getLoanPurposes()).rejects.toThrow('Network error')
      expect(mockApiClient.get).toHaveBeenCalledWith('/loan-purposes')
    })
  })

  describe('getRepaymentPeriods', () => {
    it('calls apiClient.get with correct path and returns response', async () => {
      const mockData = [
        { label: 'Weekly', value: 52 },
        { label: 'Fortnightly', value: 26 },
        { label: 'Monthly', value: 12 },
      ]
      mockApiClient.get.mockResolvedValue({ data: mockData })

      const res = await apiService.getRepaymentPeriods()

      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
      expect(mockApiClient.get).toHaveBeenCalledWith('/requested-repayment-periods')
      expect(res).toEqual({ data: mockData })
    })

    it('propagates errors from apiClient.get', async () => {
      const error = new Error('Failed to fetch repayment periods')
      mockApiClient.get.mockRejectedValue(error)

      await expect(apiService.getRepaymentPeriods()).rejects.toThrow('Failed to fetch repayment periods')
      expect(mockApiClient.get).toHaveBeenCalledWith('/requested-repayment-periods')
    })
  })

  describe('getLoanTerms', () => {
    it('calls apiClient.get with correct path and returns response', async () => {
      const mockData = [
        { label: '6 months', value: 6 },
        { label: '12 months', value: 12 },
        { label: '2 years', value: 24 },
        { label: '3 years', value: 36 },
        { label: '5 years', value: 60 },
        { label: '10 years', value: 120 },
        { label: '20 years', value: 240 },
      ]
      mockApiClient.get.mockResolvedValue({ data: mockData })

      const res = await apiService.getLoanTerms()

      expect(mockApiClient.get).toHaveBeenCalledTimes(1)
      expect(mockApiClient.get).toHaveBeenCalledWith('/requested-term-months')
      expect(res).toEqual({ data: mockData })
    })

    it('propagates errors from apiClient.get', async () => {
      const error = new Error('Server error')
      mockApiClient.get.mockRejectedValue(error)

      await expect(apiService.getLoanTerms()).rejects.toThrow('Server error')
      expect(mockApiClient.get).toHaveBeenCalledWith('/requested-term-months')
    })
  })

  describe('multiple concurrent calls', () => {
    it('handles multiple calls to the same endpoint', async () => {
      const mockData = [
        { label: 'Day-to-day capital', value: 'general', annualRate: 0.1 },
      ]
      mockApiClient.get.mockResolvedValue({ data: mockData })

      const [res1, res2] = await Promise.all([
        apiService.getLoanPurposes(),
        apiService.getLoanPurposes(),
      ])

      expect(mockApiClient.get).toHaveBeenCalledTimes(2)
      expect(res1).toEqual({ data: mockData })
      expect(res2).toEqual({ data: mockData })
    })

    it('handles calls to different endpoints concurrently', async () => {
      const loanPurposesData = [{ label: 'General', value: 'general', annualRate: 0.1 }]
      const repaymentPeriodsData = [{ label: 'Monthly', value: 12 }]
      const loanTermsData = [{ label: '12 months', value: 12 }]

      mockApiClient.get
        .mockResolvedValueOnce({ data: loanPurposesData })
        .mockResolvedValueOnce({ data: repaymentPeriodsData })
        .mockResolvedValueOnce({ data: loanTermsData })

      const [purposes, periods, terms] = await Promise.all([
        apiService.getLoanPurposes(),
        apiService.getRepaymentPeriods(),
        apiService.getLoanTerms(),
      ])

      expect(mockApiClient.get).toHaveBeenCalledTimes(3)
      expect(purposes).toEqual({ data: loanPurposesData })
      expect(periods).toEqual({ data: repaymentPeriodsData })
      expect(terms).toEqual({ data: loanTermsData })
    })
  })

  describe('axios client configuration', () => {
    it('creates axios instance with correct configuration', async () => {
      const axiosDefault = (await import('axios')).default

      expect(axiosDefault.create).toHaveBeenCalledWith({
        baseURL: '',
        timeout: 10000,
      })
    })
  })
})
