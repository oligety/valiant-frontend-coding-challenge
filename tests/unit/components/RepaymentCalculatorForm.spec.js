import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import RepaymentCalculatorForm from '../../../src/components/RepaymentCalculatorForm.vue'
import BaseInput from '../../../src/components/BaseInput.vue'
import BaseSelect from '../../../src/components/BaseSelect.vue'
import BaseButton from '../../../src/components/BaseButton.vue'
import apiService from '../../../src/services/apiService.js'
import calculatorService from '../../../src/services/calculatorService.js'

// Mock the services
vi.mock('../../../src/services/apiService.js')
vi.mock('../../../src/services/calculatorService.js')

describe('RepaymentCalculatorForm', () => {
  let wrapper

  const mockLoanPurposes = [
    { label: 'Personal Loan', value: 'personal', annualRate: 5.5 },
    { label: 'Business Loan', value: 'business', annualRate: 6.5 },
  ]

  const mockRepaymentPeriods = [
    { label: 'Monthly', value: 12 },
    { label: 'Quarterly', value: 4 },
  ]

  const mockLoanTerms = [
    { label: '1 year', value: 12 },
    { label: '2 years', value: 24 },
    { label: '5 years', value: 60 },
  ]

  beforeEach(() => {
    // Setup API mocks
    apiService.getLoanPurposes = vi.fn().mockResolvedValue({ data: mockLoanPurposes })
    apiService.getRepaymentPeriods = vi.fn().mockResolvedValue({ data: mockRepaymentPeriods })
    apiService.getLoanTerms = vi.fn().mockResolvedValue({ data: mockLoanTerms })

    wrapper = mount(RepaymentCalculatorForm, {
      global: {
        components: {
          BaseInput,
          BaseSelect,
          BaseButton,
        },
      },
    })
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.clearAllMocks()
  })

  it('renders the form component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('has correct component name', () => {
    expect(wrapper.vm.$options.name).toBe('LoanRepaymentCalculatorForm')
  })

  it('renders form with correct id', () => {
    expect(wrapper.find('#repaymentCalculatorForm').exists()).toBe(true)
  })

  it('renders heading with calculator icon', () => {
    const heading = wrapper.find('h2')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('Calculate your repayment')
  })

  it('renders calculator icon', () => {
    const icon = wrapper.find('.size-10 svg')
    expect(icon.exists()).toBe(true)
  })

  it('loads initial data on mount', async () => {
    await flushPromises()

    expect(apiService.getLoanPurposes).toHaveBeenCalled()
    expect(apiService.getRepaymentPeriods).toHaveBeenCalled()
    expect(apiService.getLoanTerms).toHaveBeenCalled()
  })

  it('renders all form fields', async () => {
    await flushPromises()

    expect(wrapper.findComponent(BaseInput).exists()).toBe(true)
    expect(wrapper.findAllComponents(BaseSelect)).toHaveLength(3)
  })

  it('renders loan amount input field', () => {
    const loanAmountInput = wrapper.findComponent({ name: 'BaseInput' })
    expect(loanAmountInput.exists()).toBe(true)
    expect(loanAmountInput.props('id')).toBe('loanAmount')
    expect(loanAmountInput.props('label')).toBe('Loan amount')
    expect(loanAmountInput.props('required')).toBe(true)
  })

  it('renders loan purpose select', async () => {
    await flushPromises()

    const selects = wrapper.findAllComponents(BaseSelect)
    const loanPurposeSelect = selects[0]
    expect(loanPurposeSelect.props('id')).toBe('loanPurpose')
    expect(loanPurposeSelect.props('label')).toBe('Loan purpose')
    expect(loanPurposeSelect.props('required')).toBe(true)
  })

  it('renders repayment period select', async () => {
    await flushPromises()

    const selects = wrapper.findAllComponents(BaseSelect)
    const repaymentPeriodSelect = selects[1]
    expect(repaymentPeriodSelect.props('id')).toBe('loanPeriod')
    expect(repaymentPeriodSelect.props('label')).toBe('Repayment period')
    expect(repaymentPeriodSelect.props('required')).toBe(true)
  })

  it('renders loan term select', async () => {
    await flushPromises()

    const selects = wrapper.findAllComponents(BaseSelect)
    const loanTermSelect = selects[2]
    expect(loanTermSelect.props('id')).toBe('loanTerm')
    expect(loanTermSelect.props('label')).toBe('Loan term')
    expect(loanTermSelect.props('required')).toBe(true)
  })

  it('renders calculate button', () => {
    const calculateButton = wrapper.find('#calculateButton')
    expect(calculateButton.exists()).toBe(true)
    expect(calculateButton.text()).toContain('Calculate')
  })

  it('renders reset button', () => {
    const resetButton = wrapper.find('#resetButton')
    expect(resetButton.exists()).toBe(true)
    expect(resetButton.text()).toContain('Reset')
  })

  it('calculate button is disabled by default', () => {
    const calculateButton = wrapper.findComponent('#calculateButton')
    expect(calculateButton.props('disabled')).toBe(true)
  })

  it('validates loan amount input', async () => {
    const input = wrapper.findComponent(BaseInput)
    const inputElement = input.find('input')

    await inputElement.setValue('500')
    await inputElement.trigger('input')

    expect(wrapper.vm.loanAmountError).toBeTruthy()
  })

  it('shows error for loan amount below minimum', async () => {
    const input = wrapper.findComponent(BaseInput)
    const inputElement = input.find('input')

    await inputElement.setValue('500')
    await inputElement.trigger('input')
    wrapper.vm.validateLoanAmount()

    expect(wrapper.vm.loanAmountError).toContain('Minimum loan amount')
  })

  it('shows error for loan amount above maximum', async () => {
    const input = wrapper.findComponent(BaseInput)
    const inputElement = input.find('input')

    await inputElement.setValue('25000000')
    await inputElement.trigger('input')
    wrapper.vm.validateLoanAmount()

    expect(wrapper.vm.loanAmountError).toContain('Maximum loan amount')
  })

  it('accepts valid loan amount', async () => {
    const input = wrapper.findComponent(BaseInput)
    const inputElement = input.find('input')

    await inputElement.setValue('10000')
    await inputElement.trigger('input')

    expect(wrapper.vm.isValidLoanAmount).toBe(true)
  })

  it('removes spaces from loan amount input', async () => {
    const event = { target: { value: '10 000' } }
    wrapper.vm.handleLoanAmountInput(event)

    expect(wrapper.vm.loanAmount).toBe('10000')
  })

  it('prevents leading zeros in loan amount', async () => {
    const event = { target: { value: '00123' } }
    wrapper.vm.handleLoanAmountInput(event)

    expect(wrapper.vm.loanAmount).toBe('123')
  })

  it('removes non-digit characters from loan amount', async () => {
    const event = { target: { value: 'abc123def' } }
    wrapper.vm.handleLoanAmountInput(event)

    expect(wrapper.vm.loanAmount).toBe('123')
  })

  it('formats currency correctly', () => {
    expect(wrapper.vm.formatCurrency(1000)).toBe('1 000')
    expect(wrapper.vm.formatCurrency(1000000)).toBe('1 000 000')
    expect(wrapper.vm.formatCurrency(123)).toBe('123')
  })

  it('emits updatedRepaymentData when calculation is successful', async () => {
    await flushPromises()

    const mockResult = {
      payment: 500,
      totalPayment: 6000,
      totalInterest: 1000,
    }

    calculatorService.computeRepayment = vi.fn().mockReturnValue(mockResult)

    // Set valid form data
    wrapper.vm.loanAmount = '10000'
    wrapper.vm.selectedLoanPurpose = mockLoanPurposes[0]
    wrapper.vm.selectedRepaymentPeriod = mockRepaymentPeriods[0]
    wrapper.vm.selectedLoanTerm = mockLoanTerms[0]

    await wrapper.vm.$nextTick()

    const calculateButton = wrapper.find('#calculateButton')
    await calculateButton.trigger('click')

    expect(wrapper.emitted('updatedRepaymentData')).toBeTruthy()
    expect(wrapper.emitted('updatedRepaymentData')[0][0]).toMatchObject(mockResult)
  })

  it('does not calculate when form is invalid', async () => {
    calculatorService.computeRepayment = vi.fn()

    const calculateButton = wrapper.find('#calculateButton')
    await calculateButton.trigger('click')

    expect(calculatorService.computeRepayment).not.toHaveBeenCalled()
  })

  it('shows error when calculation fails', async () => {
    await flushPromises()

    calculatorService.computeRepayment = vi.fn().mockReturnValue(null)

    wrapper.vm.loanAmount = '10000'
    wrapper.vm.selectedLoanPurpose = mockLoanPurposes[0]
    wrapper.vm.selectedRepaymentPeriod = mockRepaymentPeriods[0]
    wrapper.vm.selectedLoanTerm = mockLoanTerms[0]

    await wrapper.vm.$nextTick()

    wrapper.vm.calculateRepayment()

    expect(wrapper.vm.calculationError).toBeTruthy()
    expect(wrapper.vm.calculationError).toContain('Unable to calculate')
  })

  it('resets form when reset button is clicked', async () => {
    await flushPromises()

    // Set some values
    wrapper.vm.loanAmount = '10000'
    wrapper.vm.selectedLoanPurpose = mockLoanPurposes[0]
    wrapper.vm.selectedRepaymentPeriod = mockRepaymentPeriods[0]
    wrapper.vm.selectedLoanTerm = mockLoanTerms[0]
    wrapper.vm.calculationError = 'Some error'

    await wrapper.vm.$nextTick()

    const resetButton = wrapper.find('#resetButton')
    await resetButton.trigger('click')

    expect(wrapper.vm.loanAmount).toBe('')
    expect(wrapper.vm.selectedLoanPurpose).toBeNull()
    expect(wrapper.vm.selectedRepaymentPeriod).toBeNull()
    expect(wrapper.vm.selectedLoanTerm).toBeNull()
    expect(wrapper.vm.calculationError).toBe('')
  })

  it('emits resetForm event when reset is clicked', async () => {
    const resetButton = wrapper.find('#resetButton')
    await resetButton.trigger('click')

    expect(wrapper.emitted('resetForm')).toBeTruthy()
  })

  it('displays calculation error message when present', async () => {
    wrapper.vm.calculationError = 'Test error message'
    await wrapper.vm.$nextTick()

    const errorAlert = wrapper.find('[role="alert"]')
    expect(errorAlert.exists()).toBe(true)
    expect(errorAlert.text()).toContain('Test error message')
  })

  it('does not display error message when no error', () => {
    const errorAlert = wrapper.find('[role="alert"]')
    expect(errorAlert.exists()).toBe(false)
  })

  it('handles API error when loading initial data', async () => {
    apiService.getLoanPurposes = vi.fn().mockRejectedValue(new Error('API Error'))
    apiService.getRepaymentPeriods = vi.fn().mockRejectedValue(new Error('API Error'))
    apiService.getLoanTerms = vi.fn().mockRejectedValue(new Error('API Error'))

    wrapper = mount(RepaymentCalculatorForm, {
      global: {
        components: { BaseInput, BaseSelect, BaseButton },
      },
    })

    await flushPromises()

    expect(wrapper.vm.calculationError).toContain('Failed to load initial data')
  })

  it('validates all fields before calculation', async () => {
    await flushPromises()

    wrapper.vm.loanAmount = '10000'
    wrapper.vm.selectedLoanPurpose = mockLoanPurposes[0]
    wrapper.vm.selectedRepaymentPeriod = mockRepaymentPeriods[0]
    // Missing loan term

    wrapper.vm.calculateRepayment()

    expect(wrapper.vm.calculationError).toContain('Please complete all fields')
  })

  it('clears error when user starts typing valid amount', async () => {
    wrapper.vm.loanAmountError = 'Some error'
    wrapper.vm.loanAmount = '100'

    const event = { target: { value: '10000' } }
    wrapper.vm.handleLoanAmountInput(event)

    expect(wrapper.vm.loanAmountError).toBe('')
  })

  it('has correct styling classes on form container', () => {
    const form = wrapper.find('#repaymentCalculatorForm')
    expect(form.classes()).toContain('rounded-2xl')
    expect(form.classes()).toContain('bg-white')
    expect(form.classes()).toContain('shadow-large')
  })

  it('renders buttons in responsive layout', () => {
    const buttonContainer = wrapper.find('.mt-6.flex')
    expect(buttonContainer.exists()).toBe(true)
    expect(buttonContainer.classes()).toContain('flex-col')
  })

  it('calculate button has icon', () => {
    const calculateButton = wrapper.find('#calculateButton')
    const icon = calculateButton.find('svg')
    expect(icon.exists()).toBe(true)
  })

  it('reset button has icon', () => {
    const resetButton = wrapper.find('#resetButton')
    const icon = resetButton.find('svg')
    expect(icon.exists()).toBe(true)
  })

  it('error alert has correct aria attributes', async () => {
    wrapper.vm.calculationError = 'Test error'
    await wrapper.vm.$nextTick()

    const alert = wrapper.find('[role="alert"]')
    expect(alert.attributes('role')).toBe('alert')
    expect(alert.attributes('aria-live')).toBe('polite')
  })

  it('loan amount input has dollar prefix', () => {
    const input = wrapper.findComponent(BaseInput)
    expect(input.html()).toContain('$')
  })

  it('validates empty loan amount', () => {
    wrapper.vm.loanAmount = ''
    const result = wrapper.vm.validateLoanAmount()

    expect(result).toBe(false)
    expect(wrapper.vm.loanAmountError).toContain('required')
  })

  it('validates non-numeric loan amount', () => {
    wrapper.vm.loanAmount = 'abc'
    const result = wrapper.vm.validateLoanAmount()

    expect(result).toBe(false)
    expect(wrapper.vm.loanAmountError).toContain('valid number')
  })

  it('passes repayment period label to emit', async () => {
    await flushPromises()

    const mockResult = {
      payment: 500,
      totalPayment: 6000,
      totalInterest: 1000,
    }

    calculatorService.computeRepayment = vi.fn().mockReturnValue(mockResult)

    wrapper.vm.loanAmount = '10000'
    wrapper.vm.selectedLoanPurpose = mockLoanPurposes[0]
    wrapper.vm.selectedRepaymentPeriod = mockRepaymentPeriods[0]
    wrapper.vm.selectedLoanTerm = mockLoanTerms[0]

    await wrapper.vm.$nextTick()

    wrapper.vm.calculateRepayment()

    expect(wrapper.emitted('updatedRepaymentData')[0][0]).toHaveProperty('repaymentPeriodLabel')
    expect(wrapper.emitted('updatedRepaymentData')[0][0].repaymentPeriodLabel).toBe('Monthly')
  })

  it('has proper form spacing', () => {
    const formFields = wrapper.find('.flex.flex-col.space-y-4')
    expect(formFields.exists()).toBe(true)
  })

  it('populates select options after API load', async () => {
    await flushPromises()

    const selects = wrapper.findAllComponents(BaseSelect)
    expect(selects[0].props('options')).toEqual(mockLoanPurposes)
    expect(selects[1].props('options')).toEqual(mockRepaymentPeriods)
    expect(selects[2].props('options')).toEqual(mockLoanTerms)
  })

  it('matches snapshot', async () => {
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
