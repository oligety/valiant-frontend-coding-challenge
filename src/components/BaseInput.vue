<script setup>
import { useSlots, computed } from 'vue'

defineOptions({ name: 'BaseInput' })

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  success: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: '',
  },
})

// events
const emit = defineEmits(['update:modelValue'])

// slots
const slots = useSlots()

// computed properties
const inputClasses = computed(() => {
  const baseClasses = 'block w-full rounded-xl border-2 bg-white py-3 text-base text-gray-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-4 sm:text-sm'

  // Determine padding based on prefix slot and success/error icons
  let paddingClasses = 'px-4'
  if (slots.prefix && (props.success || props.error)) {
    paddingClasses = 'pl-16 pr-12'
  } else if (slots.prefix) {
    paddingClasses = 'pl-16 pr-4'
  } else if (props.success || props.error) {
    paddingClasses = 'pl-4 pr-12'
  }

  // Determine border and ring colors based on state
  let stateClasses = ''
  if (props.error) {
    stateClasses = 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/10'
  } else if (props.success) {
    stateClasses = 'border-success-500 focus:border-success-600 focus:ring-success-500/10'
  } else {
    stateClasses = 'border-gray-200 hover:border-gray-300 focus:border-primary-500 focus:ring-primary-500/10'
  }

  return `${baseClasses} ${paddingClasses} ${stateClasses}`
})

const labelClasses = computed(() => {
  if (props.error) return 'text-danger-600'
  if (props.success) return 'text-success-600'
  return 'text-gray-700 group-focus-within:text-primary-700'
})

// methods
function updateInput (event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="group">
    <label
      v-if="props.label"
      :for="props.id"
      class="mb-2 block text-sm font-medium transition-colors"
      :class="labelClasses"
    >
      {{ props.label }}
      <span
        v-if="props.required"
        class="text-danger-500"
      > *</span>
    </label>
    <div class="relative">
      <!-- Prefix slot (e.g., $) -->
      <div
        v-if="slots.prefix"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
        aria-hidden="true"
      >
        <slot name="prefix" />
      </div>

      <!-- Input field -->
      <input
        :id="props.id"
        :type="props.type"
        :value="props.modelValue"
        :class="inputClasses"
        :required="props.required"
        :aria-label="props.ariaLabel || props.label"
        :aria-required="props.required"
        :aria-invalid="!!props.error"
        :aria-describedby="props.error ? `${props.id}-error` : undefined"
        v-bind="$attrs"
        @input="updateInput"
      >

      <!-- Success icon -->
      <div
        v-if="success && !error"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4"
        aria-hidden="true"
      >
        <svg
          class="size-5 text-success-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Error icon -->
      <div
        v-if="error"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4"
        aria-hidden="true"
      >
        <svg
          class="size-5 text-danger-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Error message -->
    <p
      v-if="error"
      :id="`${props.id}-error`"
      class="mt-1.5 text-sm text-danger-700"
      role="alert"
      aria-live="polite"
    >
      {{ error }}
    </p>
  </div>
</template>
