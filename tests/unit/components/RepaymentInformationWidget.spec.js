import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RepaymentInformationWidget from '../../../src/components/RepaymentInformationWidget.vue'

describe('RepaymentInformationWidget', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(RepaymentInformationWidget)
  })

  it('renders the widget component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('has correct component name', () => {
    expect(wrapper.vm.$options.name).toBe('RepaymentInformationWidget')
  })

  it('renders widget with correct id', () => {
    expect(wrapper.find('#repaymentInformationWidget').exists()).toBe(true)
  })

  it('has correct aria attributes for accessibility', () => {
    const widget = wrapper.find('#repaymentInformationWidget')
    expect(widget.attributes('role')).toBe('status')
    expect(widget.attributes('aria-live')).toBe('polite')
    expect(widget.attributes('aria-label')).toBe('Repayment calculation placeholder')
  })

  it('has correct styling classes on container', () => {
    const widget = wrapper.find('#repaymentInformationWidget')
    expect(widget.classes()).toContain('animate-fade-in')
    expect(widget.classes()).toContain('rounded-2xl')
    expect(widget.classes()).toContain('border-2')
    expect(widget.classes()).toContain('border-dashed')
    expect(widget.classes()).toContain('border-gray-200')
    expect(widget.classes()).toContain('bg-gradient-to-br')
  })

  it('renders animated icon container', () => {
    const iconContainer = wrapper.find('.relative.mb-6')
    expect(iconContainer.exists()).toBe(true)
    expect(iconContainer.attributes('aria-hidden')).toBe('true')
  })

  it('renders ping animation element', () => {
    const pingElement = wrapper.find('.animate-ping')
    expect(pingElement.exists()).toBe(true)
    expect(pingElement.classes()).toContain('absolute')
    expect(pingElement.classes()).toContain('inset-0')
    expect(pingElement.classes()).toContain('rounded-full')
    expect(pingElement.classes()).toContain('bg-primary-400')
    expect(pingElement.classes()).toContain('opacity-20')
  })

  it('renders calculator icon', () => {
    const icon = wrapper.find('svg')
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('size-10')
    expect(icon.classes()).toContain('text-primary-700')
  })

  it('icon container has gradient background', () => {
    const iconBox = wrapper.find('.size-20')
    expect(iconBox.exists()).toBe(true)
    expect(iconBox.classes()).toContain('bg-gradient-to-br')
    expect(iconBox.classes()).toContain('from-primary-100')
    expect(iconBox.classes()).toContain('to-primary-200')
    expect(iconBox.classes()).toContain('rounded-2xl')
    expect(iconBox.classes()).toContain('shadow-medium')
  })

  it('renders main heading', () => {
    const heading = wrapper.find('h2')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('Your results will appear here')
  })

  it('heading has correct styling classes', () => {
    const heading = wrapper.find('h2')
    expect(heading.classes()).toContain('mb-3')
    expect(heading.classes()).toContain('text-xl')
    expect(heading.classes()).toContain('font-semibold')
    expect(heading.classes()).toContain('text-gray-900')
  })

  it('renders description paragraph', () => {
    const paragraph = wrapper.find('p')
    expect(paragraph.exists()).toBe(true)
    expect(paragraph.text()).toBe('Fill in the loan details on the left to calculate your repayment amount and see personalized results.')
  })

  it('description has correct styling classes', () => {
    const paragraph = wrapper.find('p')
    expect(paragraph.classes()).toContain('mb-6')
    expect(paragraph.classes()).toContain('max-w-sm')
    expect(paragraph.classes()).toContain('text-sm')
    expect(paragraph.classes()).toContain('text-gray-600')
  })

  it('renders steps list with correct aria label', () => {
    const stepsList = wrapper.find('ol')
    expect(stepsList.exists()).toBe(true)
    expect(stepsList.attributes('aria-label')).toBe('Steps to calculate repayment')
  })

  it('steps list has correct styling', () => {
    const stepsList = wrapper.find('ol')
    expect(stepsList.classes()).toContain('flex')
    expect(stepsList.classes()).toContain('flex-col')
    expect(stepsList.classes()).toContain('gap-2')
    expect(stepsList.classes()).toContain('text-left')
    expect(stepsList.classes()).toContain('text-sm')
  })

  it('renders three step items', () => {
    const steps = wrapper.findAll('li')
    expect(steps).toHaveLength(3)
  })

  it('first step has correct content', () => {
    const steps = wrapper.findAll('li')
    expect(steps[0].text()).toContain('1')
    expect(steps[0].text()).toContain('Enter your loan amount')
  })

  it('second step has correct content', () => {
    const steps = wrapper.findAll('li')
    expect(steps[1].text()).toContain('2')
    expect(steps[1].text()).toContain('Select loan purpose and terms')
  })

  it('third step has correct content', () => {
    const steps = wrapper.findAll('li')
    expect(steps[2].text()).toContain('3')
    expect(steps[2].text()).toContain('Click calculate to see results')
  })

  it('step items have correct styling', () => {
    const steps = wrapper.findAll('li')
    steps.forEach(step => {
      expect(step.classes()).toContain('flex')
      expect(step.classes()).toContain('items-center')
      expect(step.classes()).toContain('gap-2')
      expect(step.classes()).toContain('text-gray-600')
    })
  })

  it('step number badges have correct styling', () => {
    const badges = wrapper.findAll('.size-6')
    expect(badges).toHaveLength(3)

    badges.forEach(badge => {
      expect(badge.classes()).toContain('flex')
      expect(badge.classes()).toContain('items-center')
      expect(badge.classes()).toContain('justify-center')
      expect(badge.classes()).toContain('rounded-full')
      expect(badge.classes()).toContain('bg-primary-100')
      expect(badge.classes()).toContain('text-xs')
      expect(badge.classes()).toContain('font-semibold')
      expect(badge.classes()).toContain('text-primary-700')
      expect(badge.classes()).toContain('shrink-0')
    })
  })

  it('step badges are aria-hidden', () => {
    const badges = wrapper.findAll('.size-6')
    badges.forEach(badge => {
      expect(badge.attributes('aria-hidden')).toBe('true')
    })
  })

  it('has proper semantic structure', () => {
    expect(wrapper.find('#repaymentInformationWidget').exists()).toBe(true)
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('ol').exists()).toBe(true)
    expect(wrapper.findAll('li')).toHaveLength(3)
  })

  it('is a presentational component with no props', () => {
    expect(Object.keys(wrapper.props())).toHaveLength(0)
  })

  it('renders centered content', () => {
    const widget = wrapper.find('#repaymentInformationWidget')
    expect(widget.classes()).toContain('flex')
    expect(widget.classes()).toContain('flex-col')
    expect(widget.classes()).toContain('items-center')
    expect(widget.classes()).toContain('justify-center')
    expect(widget.classes()).toContain('text-center')
  })

  it('has responsive padding classes', () => {
    const widget = wrapper.find('#repaymentInformationWidget')
    expect(widget.classes()).toContain('p-6')
  })

  it('has background gradient styling', () => {
    const widget = wrapper.find('#repaymentInformationWidget')
    expect(widget.classes()).toContain('bg-gradient-to-br')
    expect(widget.classes()).toContain('from-gray-50')
    expect(widget.classes()).toContain('to-white')
  })

  it('icon has correct SVG path attributes', () => {
    const path = wrapper.find('svg path')
    expect(path.exists()).toBe(true)
    expect(path.attributes('stroke-linecap')).toBe('round')
    expect(path.attributes('stroke-linejoin')).toBe('round')
    expect(path.attributes('stroke-width')).toBe('2')
  })

  it('SVG has correct viewBox and fill attributes', () => {
    const svg = wrapper.find('svg')
    expect(svg.attributes('viewBox')).toBe('0 0 24 24')
    expect(svg.attributes('fill')).toBe('none')
    expect(svg.attributes('stroke')).toBe('currentColor')
  })

  it('renders all visual elements in correct order', () => {
    const widget = wrapper.find('#repaymentInformationWidget')
    const children = widget.element.children

    // Icon container should be first
    expect(children[0].classList.contains('relative')).toBe(true)
    expect(children[0].classList.contains('mb-6')).toBe(true)

    // Heading should be second
    expect(children[1].tagName).toBe('H2')

    // Paragraph should be third
    expect(children[2].tagName).toBe('P')

    // Steps list should be fourth
    expect(children[3].tagName).toBe('OL')
  })

  it('icon container has flex centering', () => {
    const iconBox = wrapper.find('.size-20')
    expect(iconBox.classes()).toContain('flex')
    expect(iconBox.classes()).toContain('items-center')
    expect(iconBox.classes()).toContain('justify-center')
  })

  it('has relative positioning for icon container', () => {
    const iconContainer = wrapper.find('.relative.mb-6')
    expect(iconContainer.classes()).toContain('relative')
  })

  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly without any props or slots', () => {
    const testWrapper = mount(RepaymentInformationWidget, {
      props: {},
      slots: {},
    })

    expect(testWrapper.find('#repaymentInformationWidget').exists()).toBe(true)
    expect(testWrapper.find('h2').text()).toBe('Your results will appear here')
    expect(testWrapper.findAll('li')).toHaveLength(3)
  })

  it('all step numbers are displayed correctly', () => {
    const badges = wrapper.findAll('.size-6')
    expect(badges[0].text()).toBe('1')
    expect(badges[1].text()).toBe('2')
    expect(badges[2].text()).toBe('3')
  })

  it('has proper text alignment for steps', () => {
    const stepsList = wrapper.find('ol')
    expect(stepsList.classes()).toContain('text-left')
  })

  it('step text elements are span elements', () => {
    const stepTexts = wrapper.findAll('li span:not(.size-6)')
    expect(stepTexts).toHaveLength(3)
    stepTexts.forEach(span => {
      expect(span.element.tagName).toBe('SPAN')
    })
  })

  it('maintains proper spacing between elements', () => {
    const heading = wrapper.find('h2')
    const paragraph = wrapper.find('p')
    const stepsList = wrapper.find('ol')

    expect(heading.classes()).toContain('mb-3')
    expect(paragraph.classes()).toContain('mb-6')
    expect(stepsList.classes()).toContain('gap-2')
  })

  it('icon animation elements are properly nested', () => {
    const iconContainer = wrapper.find('.relative.mb-6')
    const pingAnimation = iconContainer.find('.animate-ping')
    const iconBox = iconContainer.find('.size-20')

    expect(pingAnimation.exists()).toBe(true)
    expect(iconBox.exists()).toBe(true)
    expect(iconBox.classes()).toContain('relative')
  })

  it('has correct text color classes', () => {
    const heading = wrapper.find('h2')
    const paragraph = wrapper.find('p')
    const steps = wrapper.findAll('li')

    expect(heading.classes()).toContain('text-gray-900')
    expect(paragraph.classes()).toContain('text-gray-600')
    steps.forEach(step => {
      expect(step.classes()).toContain('text-gray-600')
    })
  })
})
