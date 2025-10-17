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

// events
const emit = defineEmits(['update:modelValue'])

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
      class="mb-2 block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-primary-700"
    >
      {{ props.label }}
    </label>
    <input
      :id="props.id"
      :type="props.type"
      :value="props.modelValue"
      class="block w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 sm:text-sm"
      v-bind="$attrs"
      @input="updateInput"
    >
  </div>
</template>
