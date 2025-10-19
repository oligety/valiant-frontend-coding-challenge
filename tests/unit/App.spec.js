import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'
import LayoutHeader from '../../src/components/LayoutHeader.vue'
import LayoutFooter from '../../src/components/LayoutFooter.vue'
import RepaymentCalculatorForm from '../../src/components/RepaymentCalculatorForm.vue'
import RepaymentInformationWidget from '../../src/components/RepaymentInformationWidget.vue'
import RepaymentResultWidget from '../../src/components/RepaymentResultWidget.vue'

describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        stubs: {
          LayoutHeader: true,
          LayoutFooter: true,
          RepaymentCalculatorForm: true,
          RepaymentInformationWidget: true,
          RepaymentResultWidget: true,
        },
      },
    })
  })

  it('renders main layout structure', () => {
    expect(wrapper.find('#mainLayout').exists()).toBe(true)
    expect(wrapper.find('#mainHeader').exists()).toBe(true)
    expect(wrapper.find('#mainContent').exists()).toBe(true)
    expect(wrapper.find('#mainFooter').exists()).toBe(true)
  })

  it('renders LayoutHeader component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent(LayoutHeader).exists()).toBe(true)
  })

  it('renders LayoutFooter component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent(LayoutFooter).exists()).toBe(true)
  })

  it('renders RepaymentCalculatorForm component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent(RepaymentCalculatorForm).exists()).toBe(true)
  })

  it('initially shows RepaymentInformationWidget when no data', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent(RepaymentInformationWidget).exists()).toBe(true)
    expect(wrapper.findComponent(RepaymentResultWidget).exists()).toBe(false)
  })

  it('shows RepaymentResultWidget when repaymentData is set', async () => {
    const wrapper = mount(App)

    const form = wrapper.findComponent(RepaymentCalculatorForm)
    await form.vm.$emit('updated-repayment-data', {
      repaymentPerPeriod: 1000,
      repaymentTotal: 12000,
      interestRate: 5,
      repaymentPeriodLabel: 'monthly',
    })

    expect(wrapper.findComponent(RepaymentResultWidget).exists()).toBe(true)
    expect(wrapper.findComponent(RepaymentInformationWidget).exists()).toBe(false)
  })

  it('passes correct props to RepaymentResultWidget', async () => {
    const wrapper = mount(App)

    const testData = {
      repaymentPerPeriod: 1500,
      repaymentTotal: 18000,
      interestRate: 6.5,
      repaymentPeriodLabel: 'weekly',
    }

    const form = wrapper.findComponent(RepaymentCalculatorForm)
    await form.vm.$emit('updated-repayment-data', testData)

    const resultWidget = wrapper.findComponent(RepaymentResultWidget)
    expect(resultWidget.props('repaymentPerPeriod')).toBe(testData.repaymentPerPeriod)
    expect(resultWidget.props('repaymentTotal')).toBe(testData.repaymentTotal)
    expect(resultWidget.props('interestRate')).toBe(testData.interestRate)
    expect(resultWidget.props('repaymentPeriodLabel')).toBe(testData.repaymentPeriodLabel)
  })

  it('resets to RepaymentInformationWidget when reset-form is emitted', async () => {
    const wrapper = mount(App)

    // First, set some data
    const form = wrapper.findComponent(RepaymentCalculatorForm)
    await form.vm.$emit('updated-repayment-data', {
      repaymentPerPeriod: 1000,
      repaymentTotal: 12000,
      interestRate: 5,
      repaymentPeriodLabel: 'monthly',
    })

    expect(wrapper.findComponent(RepaymentResultWidget).exists()).toBe(true)

    // Then reset
    await form.vm.$emit('reset-form')

    expect(wrapper.findComponent(RepaymentInformationWidget).exists()).toBe(true)
    expect(wrapper.findComponent(RepaymentResultWidget).exists()).toBe(false)
  })

  it('applies correct CSS classes to main layout', () => {
    expect(wrapper.find('#mainLayout').classes()).toContain('flex')
    expect(wrapper.find('#mainLayout').classes()).toContain('min-h-screen')
    expect(wrapper.find('#mainLayout').classes()).toContain('flex-col')
  })

  it('has responsive grid in main content', () => {
    const mainContent = wrapper.find('#mainContent')
    const gridContainer = mainContent.find('.grid')

    expect(gridContainer.exists()).toBe(true)
    expect(gridContainer.classes()).toContain('gap-6')
    expect(gridContainer.classes()).toContain('md:grid-cols-2')
  })

  it('updateRepaymentData method updates internal state', async () => {
    const wrapper = mount(App)

    const testData = {
      repaymentPerPeriod: 2000,
      repaymentTotal: 24000,
      interestRate: 7,
      repaymentPeriodLabel: 'fortnightly',
    }

    const form = wrapper.findComponent(RepaymentCalculatorForm)
    await form.vm.$emit('updated-repayment-data', testData)

    // Verify the result widget is shown with correct data
    const resultWidget = wrapper.findComponent(RepaymentResultWidget)
    expect(resultWidget.exists()).toBe(true)
    expect(resultWidget.props()).toMatchObject(testData)
  })

  it('toggles between information and result widgets correctly', async () => {
    const wrapper = mount(App)
    const form = wrapper.findComponent(RepaymentCalculatorForm)

    // Initially shows information widget
    expect(wrapper.findComponent(RepaymentInformationWidget).exists()).toBe(true)
    expect(wrapper.findComponent(RepaymentResultWidget).exists()).toBe(false)

    // After update, shows result widget
    await form.vm.$emit('updated-repayment-data', {
      repaymentPerPeriod: 1000,
      repaymentTotal: 12000,
      interestRate: 5,
      repaymentPeriodLabel: 'monthly',
    })

    expect(wrapper.findComponent(RepaymentInformationWidget).exists()).toBe(false)
    expect(wrapper.findComponent(RepaymentResultWidget).exists()).toBe(true)

    // After reset, shows information widget again
    await form.vm.$emit('reset-form')

    expect(wrapper.findComponent(RepaymentInformationWidget).exists()).toBe(true)
    expect(wrapper.findComponent(RepaymentResultWidget).exists()).toBe(false)
  })
})
