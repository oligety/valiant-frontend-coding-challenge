<script setup>
import { ref, computed } from 'vue'

defineOptions({ name: 'BaseSelect' })

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

function toggleDropdown () {
  isOpen.value = !isOpen.value
}

function selectOption (option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <label
      v-if="props.label"
      :for="props.id"
      class="mb-1 block text-sm font-medium text-gray-700"
    >{{ props.label }}</label>

    <button
      class="relative w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      :aria-expanded="isOpen"
      :aria-controls="`${props.id}-listbox`"
      @click="toggleDropdown"
    >
      {{ selectedOption ? selectedOption.label : placeholder }}

      <svg
        class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.127l3.71-3.896a.75.75 0 011.08 1.04l-4.24 4.46a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
        />
      </svg>
    </button>

    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
    >
      <li
        v-for="option in props.options"
        :key="option.value"
        class="cursor-pointer px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700"
        :class="{ 'bg-indigo-100 font-medium': selectedOption && selectedOption.value === option.value }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
