import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSelect from '../../../src/components/BaseSelect.vue'

describe('BaseSelect', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]

  let wrapper

  beforeEach(() => {
    wrapper = mount(BaseSelect, {
      props: {
        id: 'test-select',
        options: mockOptions,
      },
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders select button with required props', () => {
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').attributes('id')).toBe('test-select')
  })

  it('renders label when provided', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        id: 'test-select',
        label: 'Select Label',
        options: mockOptions,
      },
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toContain('Select Label')
    expect(label.attributes('for')).toBe('test-select')
  })

  it('shows required asterisk when required prop is true', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        id: 'test-select',
        label: 'Required Field',
        options: mockOptions,
        required: true,
      },
    })

    const label = wrapper.find('label')
    expect(label.text()).toContain('*')
    expect(wrapper.find('span[aria-label="required"]').exists()).toBe(true)
  })

  it('displays placeholder when no option is selected', () => {
    expect(wrapper.find('button span').text()).toBe('Select an option')
  })

  it('displays custom placeholder', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        id: 'test-select',
        options: mockOptions,
        placeholder: 'Choose one',
      },
    })

    expect(wrapper.find('button span').text()).toBe('Choose one')
  })

  it('displays selected option label', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        id: 'test-select',
        options: mockOptions,
        modelValue: 'opt2',
      },
    })

    expect(wrapper.find('button span').text()).toBe('Option 2')
  })

  it('opens dropdown when button is clicked', async () => {
    expect(wrapper.find('ul').exists()).toBe(false)

    await wrapper.find('button').trigger('click')

    expect(wrapper.find('ul').exists()).toBe(true)
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
  })

  it('closes dropdown when button is clicked again', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('ul').exists()).toBe(true)

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('ul').exists()).toBe(false)
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
  })

  it('renders all options in dropdown', async () => {
    await wrapper.find('button').trigger('click')

    const options = wrapper.findAll('li[role="option"]')
    expect(options).toHaveLength(3)
    expect(options[0].text()).toContain('Option 1')
    expect(options[1].text()).toContain('Option 2')
    expect(options[2].text()).toContain('Option 3')
  })

  it('emits update:modelValue when option is clicked', async () => {
    await wrapper.find('button').trigger('click')

    const firstOption = wrapper.findAll('li[role="option"]')[0]
    await firstOption.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([mockOptions[0]])
  })

  it('closes dropdown after selecting an option', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('ul').exists()).toBe(true)

    await wrapper.findAll('li[role="option"]')[0].trigger('click')
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('highlights selected option', async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        id: 'test-select',
        options: mockOptions,
        modelValue: 'opt2',
      },
    })

    await wrapper.find('button').trigger('click')

    const selectedOption = wrapper.findAll('li[role="option"]')[1]
    expect(selectedOption.classes()).toContain('bg-primary-100/70')
    expect(selectedOption.classes()).toContain('font-semibold')
    expect(selectedOption.attributes('aria-selected')).toBe('true')
  })

  it('shows checkmark icon for selected option', async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        id: 'test-select',
        options: mockOptions,
        modelValue: 'opt1',
      },
    })

    await wrapper.find('button').trigger('click')

    const selectedOption = wrapper.findAll('li[role="option"]')[0]
    const checkmark = selectedOption.find('svg')
    expect(checkmark.exists()).toBe(true)
  })

  it('opens dropdown with Enter key', async () => {
    const button = wrapper.find('button')
    await button.trigger('keydown', { key: 'Enter' })

    expect(wrapper.find('ul').exists()).toBe(true)
  })

  it('opens dropdown with Space key', async () => {
    const button = wrapper.find('button')
    await button.trigger('keydown', { key: ' ' })

    expect(wrapper.find('ul').exists()).toBe(true)
  })

  it('closes dropdown with Escape key', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('ul').exists()).toBe(true)

    await wrapper.find('button').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('navigates options with ArrowDown key', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')

    await button.trigger('keydown', { key: 'ArrowDown' })

    const options = wrapper.findAll('li[role="option"]')
    expect(options[1].attributes('data-highlighted')).toBe('true')
  })

  it('navigates options with ArrowUp key', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')

    // Move down first
    await button.trigger('keydown', { key: 'ArrowDown' })
    await button.trigger('keydown', { key: 'ArrowDown' })

    // Move up
    await button.trigger('keydown', { key: 'ArrowUp' })

    const options = wrapper.findAll('li[role="option"]')
    expect(options[1].attributes('data-highlighted')).toBe('true')
  })

  it('selects highlighted option with Enter key', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('keydown', { key: 'ArrowDown' })
    await button.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([mockOptions[1]])
  })

  it('jumps to first option with Home key', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')

    // Move to last option
    await button.trigger('keydown', { key: 'End' })
    // Then press Home
    await button.trigger('keydown', { key: 'Home' })

    const options = wrapper.findAll('li[role="option"]')
    expect(options[0].attributes('data-highlighted')).toBe('true')
  })

  it('jumps to last option with End key', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('keydown', { key: 'End' })

    const options = wrapper.findAll('li[role="option"]')
    expect(options[2].attributes('data-highlighted')).toBe('true')
  })

  it('closes dropdown on Tab key', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('ul').exists()).toBe(true)

    await wrapper.find('button').trigger('keydown', { key: 'Tab' })
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('highlights option on mouse enter', async () => {
    await wrapper.find('button').trigger('click')

    const secondOption = wrapper.findAll('li[role="option"]')[1]
    await secondOption.trigger('mouseenter')

    expect(secondOption.attributes('data-highlighted')).toBe('true')
    expect(secondOption.classes()).toContain('bg-primary-50')
  })

  it('closes dropdown when clicking outside', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('ul').exists()).toBe(true)

    // Simulate click outside
    document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('rotates arrow icon when dropdown is open', async () => {
    const svg = wrapper.find('svg')
    expect(svg.classes()).not.toContain('rotate-180')

    await wrapper.find('button').trigger('click')
    expect(svg.classes()).toContain('rotate-180')
  })

  it('applies correct aria attributes', async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        options: mockOptions,
      },
    })

    const button = wrapper.find('button')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(button.attributes('aria-controls')).toBe('test-select-listbox')

    await button.trigger('click')

    expect(button.attributes('aria-expanded')).toBe('true')

    const listbox = wrapper.find('ul')
    expect(listbox.attributes('role')).toBe('listbox')
    expect(listbox.attributes('id')).toBe('test-select-listbox')
  })

  it('handles object modelValue', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        id: 'test-select',
        options: mockOptions,
        modelValue: { label: 'Option 2', value: 'opt2' },
      },
    })

    expect(wrapper.find('button span').text()).toBe('Option 2')
  })

  it('applies correct CSS classes when dropdown is open', async () => {
    const button = wrapper.find('button')
    expect(button.classes()).not.toContain('border-primary-500')

    await button.trigger('click')
    expect(button.classes()).toContain('border-primary-500')
    expect(button.classes()).toContain('ring-4')
  })

  it('does not navigate when dropdown is closed', async () => {
    const button = wrapper.find('button')

    await button.trigger('keydown', { key: 'Home' })
    await button.trigger('keydown', { key: 'End' })

    // Dropdown should still be closed
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('prevents going below first option', async () => {
    await wrapper.find('button').trigger('click')

    const button = wrapper.find('button')
    await button.trigger('keydown', { key: 'ArrowUp' })
    await button.trigger('keydown', { key: 'ArrowUp' })

    const options = wrapper.findAll('li[role="option"]')
    expect(options[0].attributes('data-highlighted')).toBe('true')
  })

  it('prevents going above last option', async () => {
    await wrapper.find('button').trigger('click')

    const button = wrapper.find('button')
    await button.trigger('keydown', { key: 'End' })
    await button.trigger('keydown', { key: 'ArrowDown' })
    await button.trigger('keydown', { key: 'ArrowDown' })

    const options = wrapper.findAll('li[role="option"]')
    expect(options[2].attributes('data-highlighted')).toBe('true')
  })

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))

    removeEventListenerSpy.mockRestore()
  })
})
