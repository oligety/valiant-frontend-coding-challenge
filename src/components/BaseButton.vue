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
const base = 'inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:py-2'
const variants = {
  primary: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:ring-indigo-500',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400',
  outline: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus-visible:ring-indigo-500',
  danger: 'bg-red-600 text-white shadow-sm hover:bg-red-500 focus-visible:ring-red-500',
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
