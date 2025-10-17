import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RepaymentResultWidget from '../../../src/components/RepaymentResultWidget.vue'
import BaseButton from '../../../src/components/BaseButton.vue'

describe('RepaymentResultWidget', () => {
  let wrapper

  const defaultProps = {
    repaymentPerPeriod: 850.50,
    repaymentTotal: 10206,
    interestRate: 5.5,
    repaymentPeriodLabel: 'Monthly',
  }

  beforeEach(() => {
    wrapper = mount(RepaymentResultWidget, {
      props: defaultProps,
      global: {
        components: {
          BaseButton,
        },
      },
    })
  })

  it('renders the widget component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('has correct component name', () => {
    expect(wrapper.vm.$options.name).toBe('RepaymentResultWidget')
  })

  it('renders widget with correct id', () => {
    expect(wrapper.find('#repaymentResultWidget').exists()).toBe(true)
  })

  it('has correct styling classes on container', () => {
    const widget = wrapper.find('#repaymentResultWidget')
    expect(widget.classes()).toContain('animate-scale-in')
    expect(widget.classes()).toContain('rounded-2xl')
    expect(widget.classes()).toContain('border-2')
    expect(widget.classes()).toContain('border-gray-100')
    expect(widget.classes()).toContain('bg-white')
    expect(widget.classes()).toContain('shadow-large')
  })

  it('renders success icon', () => {
    const icon = wrapper.find('.size-10 svg')
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('text-white')
  })

  it('icon container has success gradient', () => {
    const iconContainer = wrapper.find('.size-10')
    expect(iconContainer.classes()).toContain('bg-gradient-to-br')
    expect(iconContainer.classes()).toContain('from-success-500')
    expect(iconContainer.classes()).toContain('to-success-600')
    expect(iconContainer.classes()).toContain('rounded-xl')
    expect(iconContainer.classes()).toContain('shadow-medium')
  })

  it('renders heading with correct text', () => {
    const heading = wrapper.find('h2')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('Your results')
  })

  it('heading has correct styling', () => {
    const heading = wrapper.find('h2')
    expect(heading.classes()).toContain('text-lg')
    expect(heading.classes()).toContain('font-semibold')
    expect(heading.classes()).toContain('text-gray-900')
  })

  it('renders primary repayment per period section', () => {
    const primarySection = wrapper.find('#repaymentPerPeriod')
    expect(primarySection.exists()).toBe(true)
  })

  it('primary section has correct styling', () => {
    const primarySection = wrapper.find('#repaymentPerPeriod')
    expect(primarySection.classes()).toContain('rounded-xl')
    expect(primarySection.classes()).toContain('bg-gradient-to-br')
    expect(primarySection.classes()).toContain('from-primary-500')
    expect(primarySection.classes()).toContain('to-primary-700')
    expect(primarySection.classes()).toContain('p-6')
    expect(primarySection.classes()).toContain('ring-2')
    expect(primarySection.classes()).toContain('ring-primary-200')
  })

  it('primary section has aria-live attribute', () => {
    const primarySection = wrapper.find('#repaymentPerPeriod')
    expect(primarySection.attributes('aria-live')).toBe('polite')
  })

  it('displays repayment period label', () => {
    const primarySection = wrapper.find('#repaymentPerPeriod')
    expect(primarySection.text()).toContain('Monthly repayment')
  })

  it('displays formatted repayment per period', () => {
    const primarySection = wrapper.find('#repaymentPerPeriod')
    expect(primarySection.text()).toContain('$851')
  })

  it('primary amount has correct styling', () => {
    const primarySection = wrapper.find('#repaymentPerPeriod')
    const amount = primarySection.find('.text-4xl')
    expect(amount.exists()).toBe(true)
    expect(amount.classes()).toContain('font-bold')
    expect(amount.classes()).toContain('text-white')
  })

  it('renders secondary results grid', () => {
    const grid = wrapper.find('.grid.grid-cols-2')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('gap-4')
  })

  it('renders total repayment section', () => {
    const totalSection = wrapper.find('#repaymentTotal')
    expect(totalSection.exists()).toBe(true)
  })

  it('total repayment section has correct styling', () => {
    const totalSection = wrapper.find('#repaymentTotal')
    expect(totalSection.classes()).toContain('rounded-xl')
    expect(totalSection.classes()).toContain('bg-gradient-to-br')
    expect(totalSection.classes()).toContain('from-gray-50')
    expect(totalSection.classes()).toContain('to-gray-100')
    expect(totalSection.classes()).toContain('p-4')
    expect(totalSection.classes()).toContain('ring-2')
    expect(totalSection.classes()).toContain('ring-gray-100')
  })

  it('total repayment section has aria-live attribute', () => {
    const totalSection = wrapper.find('#repaymentTotal')
    expect(totalSection.attributes('aria-live')).toBe('polite')
  })

  it('displays total repayment label', () => {
    const totalSection = wrapper.find('#repaymentTotal')
    expect(totalSection.text()).toContain('Total repayment')
  })

  it('displays formatted total repayment amount', () => {
    const totalSection = wrapper.find('#repaymentTotal')
    expect(totalSection.text()).toContain('$10,206')
  })

  it('renders interest rate section', () => {
    const interestSection = wrapper.find('#interestRate')
    expect(interestSection.exists()).toBe(true)
  })

  it('interest rate section has correct styling', () => {
    const interestSection = wrapper.find('#interestRate')
    expect(interestSection.classes()).toContain('rounded-xl')
    expect(interestSection.classes()).toContain('bg-gradient-to-br')
    expect(interestSection.classes()).toContain('from-secondary-50')
    expect(interestSection.classes()).toContain('to-secondary-100')
    expect(interestSection.classes()).toContain('p-4')
    expect(interestSection.classes()).toContain('ring-2')
    expect(interestSection.classes()).toContain('ring-secondary-100')
  })

  it('interest rate section has aria-live attribute', () => {
    const interestSection = wrapper.find('#interestRate')
    expect(interestSection.attributes('aria-live')).toBe('polite')
  })

  it('displays interest rate label', () => {
    const interestSection = wrapper.find('#interestRate')
    expect(interestSection.text()).toContain('Interest rate')
  })

  it('displays interest rate with percentage', () => {
    const interestSection = wrapper.find('#interestRate')
    expect(interestSection.text()).toContain('5.5%')
  })

  it('renders get in touch button', () => {
    const button = wrapper.findComponent(BaseButton)
    expect(button.exists()).toBe(true)
    expect(button.props('id')).toBe('getInTouchButton')
  })

  it('button has correct variant', () => {
    const button = wrapper.findComponent(BaseButton)
    expect(button.props('variant')).toBe('secondary')
  })

  it('button has correct styling classes', () => {
    const button = wrapper.findComponent(BaseButton)
    expect(button.classes()).toContain('mt-6')
    expect(button.classes()).toContain('w-full')
  })

  it('button displays correct text', () => {
    const button = wrapper.findComponent(BaseButton)
    expect(button.text()).toContain('Get a quote')
  })

  it('button has icon', () => {
    const button = wrapper.findComponent(BaseButton)
    const icon = button.find('svg')
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('mr-2')
    expect(icon.classes()).toContain('size-4')
  })

  it('accepts repaymentPerPeriod prop', () => {
    expect(wrapper.props('repaymentPerPeriod')).toBe(850.50)
  })

  it('accepts repaymentTotal prop', () => {
    expect(wrapper.props('repaymentTotal')).toBe(10206)
  })

  it('accepts interestRate prop', () => {
    expect(wrapper.props('interestRate')).toBe(5.5)
  })

  it('accepts repaymentPeriodLabel prop', () => {
    expect(wrapper.props('repaymentPeriodLabel')).toBe('Monthly')
  })

  it('has default value of 0 for repaymentPerPeriod', () => {
    const wrapper = mount(RepaymentResultWidget)
    expect(wrapper.props('repaymentPerPeriod')).toBe(0)
  })

  it('has default value of 0 for repaymentTotal', () => {
    const wrapper = mount(RepaymentResultWidget)
    expect(wrapper.props('repaymentTotal')).toBe(0)
  })

  it('has default value of 0 for interestRate', () => {
    const wrapper = mount(RepaymentResultWidget)
    expect(wrapper.props('interestRate')).toBe(0)
  })

  it('has default empty string for repaymentPeriodLabel', () => {
    const wrapper = mount(RepaymentResultWidget)
    expect(wrapper.props('repaymentPeriodLabel')).toBe('')
  })

  it('formats currency with spaces', () => {
    const wrapper = mount(RepaymentResultWidget, {
      props: {
        repaymentPerPeriod: 1500,
        repaymentTotal: 18000,
        interestRate: 4.5,
        repaymentPeriodLabel: 'Monthly',
      },
    })

    const totalSection = wrapper.find('#repaymentTotal')
    expect(totalSection.text()).toContain('$18,000')
  })

  it('handles large numbers correctly', () => {
    const wrapper = mount(RepaymentResultWidget, {
      props: {
        repaymentPerPeriod: 5000,
        repaymentTotal: 1000000,
        interestRate: 7.5,
        repaymentPeriodLabel: 'Monthly',
      },
    })

    const totalSection = wrapper.find('#repaymentTotal')
    expect(totalSection.text()).toContain('$1,000,000')
  })

  it('displays different repayment period labels', () => {
    const wrapper = mount(RepaymentResultWidget, {
      props: {
        repaymentPerPeriod: 2500,
        repaymentTotal: 30000,
        interestRate: 6,
        repaymentPeriodLabel: 'Quarterly',
      },
    })

    const primarySection = wrapper.find('#repaymentPerPeriod')
    expect(primarySection.text()).toContain('Quarterly repayment')
  })

  it('displays decimal interest rates', () => {
    const wrapper = mount(RepaymentResultWidget, {
      props: {
        repaymentPerPeriod: 1000,
        repaymentTotal: 12000,
        interestRate: 3.75,
        repaymentPeriodLabel: 'Monthly',
      },
    })

    const interestSection = wrapper.find('#interestRate')
    expect(interestSection.text()).toContain('3.75%')
  })

  it('has proper semantic structure', () => {
    expect(wrapper.find('#repaymentResultWidget').exists()).toBe(true)
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('#repaymentPerPeriod').exists()).toBe(true)
    expect(wrapper.find('#repaymentTotal').exists()).toBe(true)
    expect(wrapper.find('#interestRate').exists()).toBe(true)
    expect(wrapper.findComponent(BaseButton).exists()).toBe(true)
  })

  it('has correct layout structure', () => {
    const widget = wrapper.find('#repaymentResultWidget')
    expect(widget.find('.flex.items-center.gap-3').exists()).toBe(true)
    expect(widget.find('.flex.flex-col.space-y-4').exists()).toBe(true)
  })

  it('label text has correct styling in primary section', () => {
    const primarySection = wrapper.find('#repaymentPerPeriod')
    const label = primarySection.find('.text-xs')
    expect(label.exists()).toBe(true)
    expect(label.classes()).toContain('font-medium')
    expect(label.classes()).toContain('uppercase')
    expect(label.classes()).toContain('tracking-wider')
  })

  it('secondary amounts have correct styling', () => {
    const totalSection = wrapper.find('#repaymentTotal')
    const amount = totalSection.find('.text-xl')
    expect(amount.exists()).toBe(true)
    expect(amount.classes()).toContain('font-bold')
    expect(amount.classes()).toContain('text-gray-900')
  })

  it('interest rate text has correct color', () => {
    const interestSection = wrapper.find('#interestRate')
    const label = interestSection.find('.text-secondary-700')
    expect(label.exists()).toBe(true)

    const amount = interestSection.find('.text-secondary-900')
    expect(amount.exists()).toBe(true)
  })

  it('success icon has correct path attributes', () => {
    const icon = wrapper.find('.size-10 svg')
    const path = icon.find('path')
    expect(path.exists()).toBe(true)
    expect(path.attributes('stroke-linecap')).toBe('round')
    expect(path.attributes('stroke-linejoin')).toBe('round')
    expect(path.attributes('stroke-width')).toBe('2')
  })

  it('button icon has correct SVG attributes', () => {
    const button = wrapper.findComponent(BaseButton)
    const icon = button.find('svg')
    expect(icon.attributes('fill')).toBe('none')
    expect(icon.attributes('stroke')).toBe('currentColor')
    expect(icon.attributes('viewBox')).toBe('0 0 24 24')
  })

  it('renders with zero values', () => {
    const wrapper = mount(RepaymentResultWidget, {
      props: {
        repaymentPerPeriod: 0,
        repaymentTotal: 0,
        interestRate: 0,
        repaymentPeriodLabel: '',
      },
    })

    expect(wrapper.find('#repaymentPerPeriod').text()).toContain('0')
    expect(wrapper.find('#repaymentTotal').text()).toContain('0')
    expect(wrapper.find('#interestRate').text()).toContain('0%')
  })

  it('heading container has flex layout', () => {
    const headingContainer = wrapper.find('.mb-5.flex.items-center.gap-3')
    expect(headingContainer.exists()).toBe(true)
  })

  it('icon is flexbox centered', () => {
    const iconContainer = wrapper.find('.size-10')
    expect(iconContainer.classes()).toContain('flex')
    expect(iconContainer.classes()).toContain('items-center')
    expect(iconContainer.classes()).toContain('justify-center')
  })

  it('has hover effects on container', () => {
    const widget = wrapper.find('#repaymentResultWidget')
    expect(widget.classes()).toContain('hover:border-gray-200')
    expect(widget.classes()).toContain('hover:shadow-xl')
  })

  it('has transition classes', () => {
    const widget = wrapper.find('#repaymentResultWidget')
    expect(widget.classes()).toContain('transition-all')
    expect(widget.classes()).toContain('duration-300')
  })

  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with all props provided', () => {
    const testWrapper = mount(RepaymentResultWidget, {
      props: {
        repaymentPerPeriod: 1200,
        repaymentTotal: 14400,
        interestRate: 4.8,
        repaymentPeriodLabel: 'Monthly',
      },
      global: {
        components: { BaseButton },
      },
    })

    expect(testWrapper.find('#repaymentResultWidget').exists()).toBe(true)
    expect(testWrapper.text()).toContain('$1,200')
    expect(testWrapper.text()).toContain('$14,400')
    expect(testWrapper.text()).toContain('4.8%')
    expect(testWrapper.text()).toContain('Monthly repayment')
  })

  it('has responsive padding classes', () => {
    const widget = wrapper.find('#repaymentResultWidget')
    expect(widget.classes()).toContain('p-5')
  })

  it('primary section has margin top', () => {
    const primarySection = wrapper.find('#repaymentPerPeriod')
    const amount = primarySection.find('.mt-2')
    expect(amount.exists()).toBe(true)
  })

  it('secondary sections have margin top on amounts', () => {
    const totalSection = wrapper.find('#repaymentTotal')
    const totalAmount = totalSection.find('.mt-2')
    expect(totalAmount.exists()).toBe(true)

    const interestSection = wrapper.find('#interestRate')
    const interestAmount = interestSection.find('.mt-2')
    expect(interestAmount.exists()).toBe(true)
  })
})
