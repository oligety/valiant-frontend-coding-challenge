<script setup>
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
      class="mb-2 block text-sm font-medium text-gray-700"
    >
      {{ props.label }}
    </label>
    <input
      :id="props.id"
      :type="props.type"
      :value="props.modelValue"
      class="focus:border-primary-500 focus:ring-primary-500/20 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm transition-colors duration-150 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
      v-bind="$attrs"
      @input="updateInput"
    >
  </div>
</template>
