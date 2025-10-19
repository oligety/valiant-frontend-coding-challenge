<script setup>
import { computed } from 'vue'

defineOptions({ name: 'BaseButton' })

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  ariaLabel: {
    type: String,
    default: '',
  },
})

// events
const emit = defineEmits(['click'])

// button styling
const base = 'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:saturate-50 disabled:pointer-events-none sm:py-2'
const variants = {
  primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-medium hover:shadow-large hover:from-primary-700 hover:to-primary-800 active:scale-[0.98] focus-visible:ring-primary-500',
  secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-medium hover:shadow-large hover:from-secondary-600 hover:to-secondary-700 active:scale-[0.98] focus-visible:ring-secondary-500',
  outline: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50/50 active:scale-[0.98] focus-visible:ring-primary-500',
  danger: 'bg-gradient-to-r from-danger-500 to-danger-600 text-white shadow-medium hover:shadow-large hover:from-danger-600 hover:to-danger-700 active:scale-[0.98] focus-visible:ring-danger-500',
}

// computed properties
const classes = computed(() => [
  base,
  variants[props.variant] ?? variants.primary,
].join(' '))

// methods
function handleClick () {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <button
    :id="props.id"
    :type="props.type"
    :disabled="props.disabled"
    :class="classes"
    :aria-label="props.ariaLabel || undefined"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
