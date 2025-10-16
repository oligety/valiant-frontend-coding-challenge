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
  // if modelValue is already an object, return it; otherwise find by value
  if (props.modelValue && typeof props.modelValue === 'object') return props.modelValue
  return props.options.find(option => option.value === props.modelValue) || null
})

function toggleDropdown () {
  isOpen.value = !isOpen.value
}

function selectOption (option) {
  emit('update:modelValue', option)
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <label
      v-if="props.label"
      :for="props.id"
      class="mb-2 block text-sm font-medium text-gray-700"
    >{{ props.label }}</label>

    <button
      :id="props.id"
      type="button"
      class="relative w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-left shadow-sm transition-colors duration-150 hover:border-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      :class="{ 'border-primary-500 ring-2 ring-primary-500/20': isOpen }"
      :aria-expanded="isOpen"
      :aria-controls="`${props.id}-listbox`"
      @click="toggleDropdown"
    >
      <span :class="{ 'text-gray-500': !selectedOption }">
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>

      <svg
        class="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180 text-primary-500': isOpen }"
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

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-if="isOpen"
        :id="`${props.id}-listbox`"
        class="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        role="listbox"
      >
        <li
          v-for="option in props.options"
          :key="option.value"
          role="option"
          class="cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-primary-50 hover:text-primary-700"
          :class="{ 'bg-primary-50 font-semibold text-primary-700': selectedOption && selectedOption.value === option.value }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>
