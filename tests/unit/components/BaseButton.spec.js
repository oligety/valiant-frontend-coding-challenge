import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../../../src/components/BaseButton.vue'

describe('BaseButton', () => {
  it('renders button with default props', () => {
    const wrapper = mount(BaseButton, {
      props: {
        id: 'test-button',
      },
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.attributes('id')).toBe('test-button')
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('applies correct variant classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        id: 'test-button',
        variant: 'secondary',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('from-secondary-500')
    expect(button.classes()).toContain('to-secondary-600')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        id: 'test-button',
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        id: 'test-button',
        disabled: true,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('disables button when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        id: 'test-button',
        disabled: true,
      },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('sets correct button type', () => {
    const wrapper = mount(BaseButton, {
      props: {
        id: 'test-button',
        type: 'submit',
      },
    })

    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('sets aria-label when provided', () => {
    const wrapper = mount(BaseButton, {
      props: {
        id: 'test-button',
        ariaLabel: 'Submit form',
      },
    })

    expect(wrapper.find('button').attributes('aria-label')).toBe('Submit form')
  })

  it('applies primary variant by default', () => {
    const wrapper = mount(BaseButton, {
      props: {
        id: 'test-button',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('from-primary-600')
    expect(button.classes()).toContain('to-primary-700')
  })

  it('applies all variant styles correctly', () => {
    const variants = ['primary', 'secondary', 'outline', 'danger']

    variants.forEach(variant => {
      const wrapper = mount(BaseButton, {
        props: {
          id: 'test-button',
          variant,
        },
      })

      const button = wrapper.find('button')
      expect(button.classes().length).toBeGreaterThan(0)
    })
  })
})
