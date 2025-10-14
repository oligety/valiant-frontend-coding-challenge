<script setup>
import { defineProps, defineEmits } from 'vue'

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
  modelValue: { // For v-model binding
    type: [String, Number],
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const updateInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div>
    <label
      v-if="props.label"
      :for="props.id"
      class="mb-1 block text-sm font-medium text-gray-700"
    >
      {{ props.label }}
    </label>
    <input
      :id="props.id"
      :type="props.type"
      :value="props.modelValue"
      class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      v-bind="$attrs"
      @input="updateInput"
    >
  </div>
</template>
