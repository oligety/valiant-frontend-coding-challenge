import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '../../../src/components/BaseInput.vue'

describe('BaseInput', () => {
  it('renders input with required id prop', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
      },
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('id')).toBe('test-input')
  })

  it('renders label when provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        label: 'Test Label',
      },
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toContain('Test Label')
    expect(label.attributes('for')).toBe('test-input')
  })

  it('does not render label when not provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
      },
    })

    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('shows required asterisk when required prop is true', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        label: 'Required Field',
        required: true,
      },
    })

    const label = wrapper.find('label')
    expect(label.text()).toContain('*')
    expect(wrapper.find('input').attributes('required')).toBeDefined()
    expect(wrapper.find('input').attributes('aria-required')).toBe('true')
  })

  it('sets input type correctly', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        type: 'number',
      },
    })

    expect(wrapper.find('input').attributes('type')).toBe('number')
  })

  it('defaults to text type when not specified', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
      },
    })

    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('binds modelValue to input value', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        modelValue: 'test value',
      },
    })

    expect(wrapper.find('input').element.value).toBe('test value')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('new value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value'])
  })

  it('displays error message when error prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        error: 'This field is required',
      },
    })

    const errorMessage = wrapper.find('p[role="alert"]')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('This field is required')
    expect(errorMessage.attributes('id')).toBe('test-input-error')
  })

  it('applies error styling when error prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        error: 'Error message',
      },
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('border-danger-500')
  })

  it('shows error icon when error prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        error: 'Error message',
      },
    })

    const errorIcon = wrapper.findAll('svg').find(svg =>
      svg.classes().includes('text-danger-500')
    )
    expect(errorIcon).toBeTruthy()
  })

  it('shows success icon when success prop is true', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        success: true,
      },
    })

    const successIcon = wrapper.findAll('svg').find(svg =>
      svg.classes().includes('text-success-500')
    )
    expect(successIcon).toBeTruthy()
  })

  it('applies success styling when success prop is true', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        success: true,
      },
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('border-success-500')
  })

  it('prioritizes error over success when both are provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        error: 'Error message',
        success: true,
      },
    })

    const errorIcon = wrapper.findAll('svg').find(svg =>
      svg.classes().includes('text-danger-500')
    )
    expect(errorIcon).toBeTruthy()

    const successIcon = wrapper.findAll('svg').find(svg =>
      svg.classes().includes('text-success-500')
    )
    expect(successIcon).toBeFalsy()
  })

  it('renders prefix slot content', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
      },
      slots: {
        prefix: '<span class="prefix-content">$</span>',
      },
    })

    expect(wrapper.find('.prefix-content').exists()).toBe(true)
    expect(wrapper.find('.prefix-content').text()).toBe('$')
  })

  it('applies correct padding when prefix slot is used', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
      },
      slots: {
        prefix: '<span>$</span>',
      },
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('pl-16')
  })

  it('applies correct padding with prefix and error', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        error: 'Error',
      },
      slots: {
        prefix: '<span>$</span>',
      },
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('pl-16')
    expect(input.classes()).toContain('pr-12')
  })

  it('applies correct padding with prefix and success', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        success: true,
      },
      slots: {
        prefix: '<span>$</span>',
      },
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('pl-16')
    expect(input.classes()).toContain('pr-12')
  })

  it('sets aria-label from ariaLabel prop', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        ariaLabel: 'Custom aria label',
      },
    })

    expect(wrapper.find('input').attributes('aria-label')).toBe('Custom aria label')
  })

  it('falls back to label for aria-label when ariaLabel not provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        label: 'Field Label',
      },
    })

    expect(wrapper.find('input').attributes('aria-label')).toBe('Field Label')
  })

  it('sets aria-invalid when error is present', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        error: 'Error message',
      },
    })

    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('test-input-error')
  })

  it('does not set aria-invalid when no error', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
      },
    })

    expect(wrapper.find('input').attributes('aria-invalid')).toBe('false')
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
  })

  it('applies correct label color based on state', () => {
    // Error state
    const errorWrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        label: 'Test',
        error: 'Error',
      },
    })
    expect(errorWrapper.find('label').classes()).toContain('text-danger-600')

    // Success state
    const successWrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        label: 'Test',
        success: true,
      },
    })
    expect(successWrapper.find('label').classes()).toContain('text-success-600')

    // Normal state
    const normalWrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        label: 'Test',
      },
    })
    expect(normalWrapper.find('label').classes()).toContain('text-gray-700')
  })

  it('passes through additional attributes via v-bind', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
      },
      attrs: {
        placeholder: 'Enter value',
        maxlength: '10',
        disabled: true,
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter value')
    expect(input.attributes('maxlength')).toBe('10')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('handles numeric modelValue', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        type: 'number',
        modelValue: 42,
      },
    })

    expect(wrapper.find('input').element.value).toBe('42')
  })

  it('updates value reactively when modelValue prop changes', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        modelValue: 'initial',
      },
    })

    expect(wrapper.find('input').element.value).toBe('initial')

    await wrapper.setProps({ modelValue: 'updated' })
    expect(wrapper.find('input').element.value).toBe('updated')
  })
})
