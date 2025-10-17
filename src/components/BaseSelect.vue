<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

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

// events
const emit = defineEmits(['update:modelValue'])

// reactive state
const isOpen = ref(false)
const selectRef = ref(null)

// computed properties
const selectedOption = computed(() => {
  if (props.modelValue && typeof props.modelValue === 'object') return props.modelValue
  return props.options.find(option => option.value === props.modelValue) || null
})

// methods
function toggleDropdown () {
  isOpen.value = !isOpen.value
}

function selectOption (option) {
  emit('update:modelValue', option)
  isOpen.value = false
}

function handleClickOutside (event) {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="selectRef"
    class="group relative"
  >
    <label
      v-if="props.label"
      :for="props.id"
      class="mb-2 block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-primary-700"
    >{{ props.label }}</label>

    <button
      :id="props.id"
      type="button"
      class="relative w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-10 text-left text-base transition-all hover:border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 sm:text-sm"
      :class="{ 'border-primary-500 ring-4 ring-primary-500/10': isOpen }"
      :aria-expanded="isOpen"
      :aria-controls="`${props.id}-listbox`"
      @click="toggleDropdown"
    >
      <span :class="{ 'text-gray-400': !selectedOption }">
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>

      <svg
        class="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-400 transition-all duration-200"
        :class="{ 'rotate-180 text-primary-600': isOpen }"
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
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <ul
        v-if="isOpen && props.options.length > 0"
        :id="`${props.id}-listbox`"
        class="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border-2 border-gray-200 bg-white py-2 shadow-large"
        role="listbox"
      >
        <li
          v-for="option in props.options"
          :key="option.value"
          role="option"
          class="cursor-pointer px-4 py-2.5 text-base transition-colors hover:bg-primary-50 hover:text-primary-700 sm:text-sm"
          :class="{ 'bg-primary-100/70 font-semibold text-primary-700': selectedOption && selectedOption.value === option.value }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>
