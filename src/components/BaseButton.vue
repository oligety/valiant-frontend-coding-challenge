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
})

const emit = defineEmits(['click'])

// button styling
const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
const variants = {
  primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400',
  outline: 'bg-white text-gray-900 border border-gray-300 shadow-sm hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-primary-500',
  danger: 'bg-danger-600 text-white shadow-sm hover:bg-danger-700 active:bg-danger-800 focus-visible:ring-danger-500',
}
const classes = computed(() => [
  base,
  variants[props.variant] ?? variants.primary,
].join(' '))

function handleClick () {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <button
    :id="props.id"
    :disabled="props.disabled"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
