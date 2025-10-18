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

  describe('Component Rendering', () => {
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
  })

  describe('Header Section', () => {
    it('renders logo wrapper', () => {
      expect(wrapper.find('#repaymentResultLogoWrapper').exists()).toBe(true)
    })

    it('renders success icon', () => {
      const icon = wrapper.find('.size-12 svg')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain('text-white')
    })

    it('icon container has correct styling', () => {
      const iconContainer = wrapper.find('.size-12')
      expect(iconContainer.classes()).toContain('bg-success-500')
      expect(iconContainer.classes()).toContain('rounded-xl')
      expect(iconContainer.classes()).toContain('shadow-md')
    })

    it('renders title section', () => {
      expect(wrapper.find('#repaymentResultTitle').exists()).toBe(true)
    })

    it('renders heading with correct text', () => {
      const heading = wrapper.find('h2')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('Your Results')
    })

    it('heading has correct styling', () => {
      const heading = wrapper.find('h2')
      expect(heading.classes()).toContain('text-xl')
      expect(heading.classes()).toContain('font-bold')
      expect(heading.classes()).toContain('text-gray-900')
    })

    it('renders subtitle', () => {
      const subtitle = wrapper.find('#repaymentResultTitle p')
      expect(subtitle.exists()).toBe(true)
      expect(subtitle.text()).toBe('Estimated loan breakdown')
    })
  })

  describe('Primary Repayment Section', () => {
    it('renders primary repayment per period section', () => {
      const primarySection = wrapper.find('#repaymentPerPeriod')
      expect(primarySection.exists()).toBe(true)
    })

    it('primary section has correct styling', () => {
      const primarySection = wrapper.find('#repaymentPerPeriod')
      expect(primarySection.classes()).toContain('rounded-2xl')
      expect(primarySection.classes()).toContain('bg-primary-600')
      expect(primarySection.classes()).toContain('p-8')
    })

    it('primary section has aria-live attribute', () => {
      const primarySection = wrapper.find('#repaymentPerPeriod')
      expect(primarySection.attributes('aria-live')).toBe('polite')
    })

    it('displays repayment period label in uppercase', () => {
      const primarySection = wrapper.find('#repaymentPerPeriod')
      const label = primarySection.find('.uppercase')
      expect(label.text()).toBe('Monthly repayment')
    })

    it('displays formatted repayment per period', () => {
      const primarySection = wrapper.find('#repaymentPerPeriod')
      expect(primarySection.text()).toContain('$851')
    })

    it('primary amount has correct styling', () => {
      const primarySection = wrapper.find('#repaymentPerPeriod')
      const amount = primarySection.find('.text-5xl')
      expect(amount.exists()).toBe(true)
      expect(amount.classes()).toContain('font-extrabold')
      expect(amount.classes()).toContain('text-white')
    })
  })

  describe('Secondary Results Grid', () => {
    it('renders secondary results grid', () => {
      const grid = wrapper.find('.grid.grid-cols-1')
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
      expect(totalSection.classes()).toContain('bg-gray-800')
      expect(totalSection.classes()).toContain('p-5')
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
      expect(interestSection.classes()).toContain('bg-secondary-600')
      expect(interestSection.classes()).toContain('p-5')
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
  })

  describe('Get In Touch Button', () => {
    it('renders get in touch button', () => {
      const button = wrapper.findComponent(BaseButton)
      expect(button.exists()).toBe(true)
    })

    it('button has correct id', () => {
      const button = wrapper.find('#getInTouchButton')
      expect(button.exists()).toBe(true)
    })

    it('button has correct variant', () => {
      const button = wrapper.findComponent(BaseButton)
      expect(button.props('variant')).toBe('outline')
    })

    it('button has correct styling classes', () => {
      const button = wrapper.findComponent(BaseButton)
      expect(button.classes()).toContain('mt-6')
    })

    it('button has aria-label', () => {
      const button = wrapper.find('#getInTouchButton')
      expect(button.attributes('aria-label')).toBe('Get in touch button')
    })

    it('button displays correct text', () => {
      const button = wrapper.findComponent(BaseButton)
      expect(button.text()).toContain('Get in touch')
    })
  })

  describe('Props', () => {
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
  })

  describe('Currency Formatting', () => {
    it('formats currency with commas', () => {
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

    it('formats decimals correctly', () => {
      const wrapper = mount(RepaymentResultWidget, {
        props: {
          repaymentPerPeriod: 1234.56,
          repaymentTotal: 14814.72,
          interestRate: 4.5,
          repaymentPeriodLabel: 'Monthly',
        },
      })

      const primarySection = wrapper.find('#repaymentPerPeriod')
      expect(primarySection.text()).toContain('$1,235')
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
      expect(totalSection.text()).toContain('1,000,000')
    })

    it('handles zero values', () => {
      const wrapper = mount(RepaymentResultWidget, {
        props: {
          repaymentPerPeriod: 0,
          repaymentTotal: 0,
          interestRate: 0,
          repaymentPeriodLabel: 'Monthly',
        },
      })

      const primarySection = wrapper.find('#repaymentPerPeriod')
      const totalSection = wrapper.find('#repaymentTotal')

      expect(primarySection.text()).toContain('$0')
      expect(totalSection.text()).toContain('$0')
    })
  })

  describe('Different Repayment Periods', () => {
    it('displays weekly repayment period label', () => {
      const wrapper = mount(RepaymentResultWidget, {
        props: {
          repaymentPerPeriod: 200,
          repaymentTotal: 10400,
          interestRate: 6,
          repaymentPeriodLabel: 'Weekly',
        },
      })

      const primarySection = wrapper.find('#repaymentPerPeriod')
      expect(primarySection.text()).toContain('Weekly repayment')
    })

    it('displays fortnightly repayment period label', () => {
      const wrapper = mount(RepaymentResultWidget, {
        props: {
          repaymentPerPeriod: 400,
          repaymentTotal: 10400,
          interestRate: 6,
          repaymentPeriodLabel: 'Fortnightly',
        },
      })

      const primarySection = wrapper.find('#repaymentPerPeriod')
      expect(primarySection.text()).toContain('Fortnightly repayment')
    })

    it('displays quarterly repayment period label', () => {
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
  })

  describe('Interest Rate Display', () => {
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

    it('displays whole number interest rates', () => {
      const wrapper = mount(RepaymentResultWidget, {
        props: {
          repaymentPerPeriod: 1000,
          repaymentTotal: 12000,
          interestRate: 5,
          repaymentPeriodLabel: 'Monthly',
        },
      })

      const interestSection = wrapper.find('#interestRate')
      expect(interestSection.text()).toContain('5%')
    })

    it('displays zero interest rate', () => {
      const wrapper = mount(RepaymentResultWidget, {
        props: {
          repaymentPerPeriod: 1000,
          repaymentTotal: 12000,
          interestRate: 0,
          repaymentPeriodLabel: 'Monthly',
        },
      })

      const interestSection = wrapper.find('#interestRate')
      expect(interestSection.text()).toContain('0%')
    })
  })

  describe('Accessibility', () => {
    it('all result sections have aria-live="polite"', () => {
      expect(wrapper.find('#repaymentPerPeriod').attributes('aria-live')).toBe('polite')
      expect(wrapper.find('#repaymentTotal').attributes('aria-live')).toBe('polite')
      expect(wrapper.find('#interestRate').attributes('aria-live')).toBe('polite')
    })

    it('button has aria-label attribute', () => {
      const button = wrapper.find('#getInTouchButton')
      expect(button.attributes('aria-label')).toBe('Get in touch button')
    })
  })

  describe('Snapshot', () => {
    it('matches snapshot with default props', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
