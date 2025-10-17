import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LayoutFooter from '../../../src/components/LayoutFooter.vue'

describe('LayoutFooter', () => {
  it('renders the footer component', () => {
    const wrapper = mount(LayoutFooter)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders footer with correct id', () => {
    const wrapper = mount(LayoutFooter)
    expect(wrapper.find('#layoutFooter').exists()).toBe(true)
  })

  it('displays copyright text', () => {
    const wrapper = mount(LayoutFooter)
    expect(wrapper.text()).toContain('2025 Made with ❤️ by Olivier Liechti')
  })

  it('has correct base CSS classes for footer container', () => {
    const wrapper = mount(LayoutFooter)
    const footer = wrapper.find('#layoutFooter')

    expect(footer.classes()).toContain('border-t')
    expect(footer.classes()).toContain('border-gray-200')
    expect(footer.classes()).toContain('bg-white')
    expect(footer.classes()).toContain('py-4')
    expect(footer.classes()).toContain('text-center')
  })

  it('has flex container with centered content', () => {
    const wrapper = mount(LayoutFooter)
    const flexContainer = wrapper.find('.flex.justify-center')

    expect(flexContainer.exists()).toBe(true)
    expect(flexContainer.classes()).toContain('flex')
    expect(flexContainer.classes()).toContain('justify-center')
  })

  it('renders inner badge container with gradient styling', () => {
    const wrapper = mount(LayoutFooter)
    const badge = wrapper.find('.rounded-full')

    expect(badge.exists()).toBe(true)
    expect(badge.classes()).toContain('rounded-full')
    expect(badge.classes()).toContain('bg-gradient-to-r')
    expect(badge.classes()).toContain('from-primary-600/10')
    expect(badge.classes()).toContain('via-secondary-600/10')
    expect(badge.classes()).toContain('to-primary-600/10')
    expect(badge.classes()).toContain('px-4')
    expect(badge.classes()).toContain('py-2')
  })

  it('renders copyright text with correct styling', () => {
    const wrapper = mount(LayoutFooter)
    const text = wrapper.find('span')

    expect(text.exists()).toBe(true)
    expect(text.classes()).toContain('text-xs')
    expect(text.classes()).toContain('font-medium')
    expect(text.classes()).toContain('text-gray-600')
  })

  it('has items-center and gap-2 classes on badge', () => {
    const wrapper = mount(LayoutFooter)
    const badge = wrapper.find('.flex.items-center.gap-2')

    expect(badge.exists()).toBe(true)
    expect(badge.classes()).toContain('items-center')
    expect(badge.classes()).toContain('gap-2')
  })

  it('matches snapshot', () => {
    const wrapper = mount(LayoutFooter)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has correct component name', () => {
    const wrapper = mount(LayoutFooter)
    expect(wrapper.vm.$options.name).toBe('LayoutFooter')
  })

  it('contains heart emoji', () => {
    const wrapper = mount(LayoutFooter)
    expect(wrapper.html()).toContain('❤️')
  })

  it('is a simple presentational component with no props', () => {
    const wrapper = mount(LayoutFooter)
    expect(Object.keys(wrapper.props())).toHaveLength(0)
  })

  it('renders correctly without any props or slots', () => {
    const wrapper = mount(LayoutFooter, {
      props: {},
      slots: {},
    })

    expect(wrapper.find('#layoutFooter').exists()).toBe(true)
    expect(wrapper.text()).toContain('2025 Made with ❤️ by Olivier Liechti')
  })

  it('has proper semantic structure', () => {
    const wrapper = mount(LayoutFooter)

    // Check structure: wrapper > flex container > badge > text
    const footer = wrapper.find('#layoutFooter')
    expect(footer.find('.flex.justify-center').exists()).toBe(true)
    expect(footer.find('.rounded-full').exists()).toBe(true)
    expect(footer.find('span').exists()).toBe(true)
  })
})
