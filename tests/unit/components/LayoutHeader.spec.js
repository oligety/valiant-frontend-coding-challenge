import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LayoutHeader from '../../../src/components/LayoutHeader.vue'

describe('LayoutHeader', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LayoutHeader)
  })

  it('renders the header component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders header with correct id', () => {
    expect(wrapper.find('#layoutHeader').exists()).toBe(true)
  })

  it('has correct component name', () => {
    expect(wrapper.vm.$options.name).toBe('LayoutHeader')
  })

  it('has animate-fade-in class on root element', () => {
    const header = wrapper.find('#layoutHeader')
    expect(header.classes()).toContain('animate-fade-in')
  })

  it('renders the logo image', () => {
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('Valiant Finance logo')
  })

  it('logo has correct styling classes', () => {
    const img = wrapper.find('img')
    expect(img.classes()).toContain('h-8')
    expect(img.classes()).toContain('w-auto')
    expect(img.classes()).toContain('object-contain')
    expect(img.classes()).toContain('transition-transform')
  })

  it('logo is wrapped in a link to Valiant Finance website', () => {
    const link = wrapper.find('a[href="https://www.valiantfinance.com/"]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(link.attributes('aria-label')).toBe('Visit Valiant Finance website')
  })

  it('renders main heading with correct text', () => {
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toBe('Loan Repayment Calculator')
  })

  it('main heading has gradient styling', () => {
    const h1 = wrapper.find('h1')
    expect(h1.classes()).toContain('bg-gradient-to-r')
    expect(h1.classes()).toContain('from-gray-900')
    expect(h1.classes()).toContain('via-gray-800')
    expect(h1.classes()).toContain('to-gray-900')
    expect(h1.classes()).toContain('bg-clip-text')
    expect(h1.classes()).toContain('text-transparent')
    expect(h1.classes()).toContain('font-bold')
  })

  it('renders subtitle paragraph', () => {
    const p = wrapper.find('p')
    expect(p.exists()).toBe(true)
    expect(p.text()).toBe('Calculate your loan repayments instantly')
  })

  it('subtitle has correct styling classes', () => {
    const p = wrapper.find('p')
    expect(p.classes()).toContain('mt-1')
    expect(p.classes()).toContain('text-xs')
    expect(p.classes()).toContain('text-gray-600')
  })

  it('renders decorative divider section', () => {
    const divider = wrapper.find('.border-t-2.border-gray-100')
    expect(divider.exists()).toBe(true)
  })

  it('renders three decorative dots', () => {
    const dots = wrapper.findAll('.rounded-full')
    // Filter out the badge container that also has rounded-full
    const decorativeDots = dots.filter(dot => dot.classes().includes('size-2'))
    expect(decorativeDots).toHaveLength(3)
  })

  it('decorative dots have correct color classes', () => {
    const dots = wrapper.findAll('.size-2.rounded-full')
    expect(dots[0].classes()).toContain('bg-primary-200')
    expect(dots[1].classes()).toContain('bg-secondary-200')
    expect(dots[2].classes()).toContain('bg-primary-200')
  })

  it('has responsive flex layout', () => {
    const flexContainer = wrapper.find('.flex.w-full.flex-col')
    expect(flexContainer.exists()).toBe(true)
  })

  it('logo container has group class for hover effects', () => {
    const logoContainer = wrapper.find('.group.relative.shrink-0')
    expect(logoContainer.exists()).toBe(true)
  })

  it('has proper semantic HTML structure', () => {
    // Check main structure
    expect(wrapper.find('#layoutHeader').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('divider section has aria-hidden attribute', () => {
    const ariaHidden = wrapper.find('[aria-hidden="true"]')
    expect(ariaHidden.exists()).toBe(true)
  })

  it('has relative positioning on divider wrapper', () => {
    const dividerWrapper = wrapper.find('.relative.mt-6')
    expect(dividerWrapper.exists()).toBe(true)
  })

  it('divider has centered content', () => {
    const centered = wrapper.find('.relative.flex.justify-center')
    expect(centered.exists()).toBe(true)
  })

  it('dots container has flex with gap', () => {
    const dotsContainer = wrapper.find('.flex.gap-1')
    expect(dotsContainer.exists()).toBe(true)
    expect(dotsContainer.classes()).toContain('gap-1')
  })

  it('is a simple presentational component with no props', () => {
    expect(Object.keys(wrapper.props())).toHaveLength(0)
  })

  it('logo image src is properly set', () => {
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBeTruthy()
    expect(img.attributes('src')).toContain('Valiant_Logo_Horizontal_Black.png')
  })

  it('has responsive text sizing classes on heading', () => {
    const h1 = wrapper.find('h1')
    expect(h1.classes()).toContain('text-lg')
  })

  it('has responsive text sizing classes on subtitle', () => {
    const p = wrapper.find('p')
    expect(p.classes()).toContain('text-xs')
  })

  it('logo link opens in new tab with security attributes', () => {
    const link = wrapper.find('a')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toContain('noopener')
    expect(link.attributes('rel')).toContain('noreferrer')
  })

  it('has transition classes on logo image', () => {
    const img = wrapper.find('img')
    expect(img.classes()).toContain('transition-transform')
    expect(img.classes()).toContain('duration-300')
  })

  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders all main sections', () => {
    // Logo and title section
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)

    // Divider section
    expect(wrapper.find('.border-t-2').exists()).toBe(true)
    expect(wrapper.findAll('.size-2.rounded-full')).toHaveLength(3)
  })

  it('has proper accessibility attributes on logo link', () => {
    const link = wrapper.find('a')
    expect(link.attributes('aria-label')).toBe('Visit Valiant Finance website')
  })

  it('divider has absolute positioning for line', () => {
    const absoluteDiv = wrapper.find('.absolute.inset-0.flex.items-center')
    expect(absoluteDiv.exists()).toBe(true)
  })

  it('title container has flex-1 class on small screens', () => {
    const titleContainer = wrapper.find('.flex-1')
    expect(titleContainer.exists()).toBe(true)
  })

  it('renders correctly without any props', () => {
    const testWrapper = mount(LayoutHeader, {
      props: {},
    })
    expect(testWrapper.find('#layoutHeader').exists()).toBe(true)
    expect(testWrapper.find('h1').text()).toBe('Loan Repayment Calculator')
  })
})
