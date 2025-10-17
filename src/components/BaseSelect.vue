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
  required: {
    type: Boolean,
    default: false,
  },
})

// events
const emit = defineEmits(['update:modelValue'])

// reactive state
const isOpen = ref(false)
const selectRef = ref(null)
const highlightedIndex = ref(-1)
const searchQuery = ref('')
const searchTimeout = ref(null)

// computed properties
const selectedOption = computed(() => {
  if (props.modelValue && typeof props.modelValue === 'object') return props.modelValue
  return props.options.find(option => option.value === props.modelValue) || null
})

const selectedIndex = computed(() => {
  return props.options.findIndex(option =>
    selectedOption.value && option.value === selectedOption.value.value
  )
})

// methods
function toggleDropdown () {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    highlightedIndex.value = selectedIndex.value >= 0 ? selectedIndex.value : 0
    // Focus will help screen readers announce the opened state
    setTimeout(() => {
      const highlighted = selectRef.value?.querySelector('[data-highlighted="true"]')
      highlighted?.scrollIntoView({ block: 'nearest' })
    }, 0)
  } else {
    searchQuery.value = ''
  }
}

function selectOption (option, closeDropdown = true) {
  emit('update:modelValue', option)
  if (closeDropdown) {
    isOpen.value = false
    highlightedIndex.value = -1
  }
}

function handleClickOutside (event) {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false
    highlightedIndex.value = -1
  }
}

function handleKeyDown (event) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!isOpen.value) {
        toggleDropdown()
      } else if (highlightedIndex.value >= 0) {
        selectOption(props.options[highlightedIndex.value])
      }
      break

    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        isOpen.value = false
        highlightedIndex.value = -1
      }
      break

    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        toggleDropdown()
      } else {
        highlightedIndex.value = Math.min(highlightedIndex.value + 1, props.options.length - 1)
        scrollToHighlighted()
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        toggleDropdown()
      } else {
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
        scrollToHighlighted()
      }
      break

    case 'Home':
      if (isOpen.value) {
        event.preventDefault()
        highlightedIndex.value = 0
        scrollToHighlighted()
      }
      break

    case 'End':
      if (isOpen.value) {
        event.preventDefault()
        highlightedIndex.value = props.options.length - 1
        scrollToHighlighted()
      }
      break

    case 'Tab':
      if (isOpen.value) {
        isOpen.value = false
        highlightedIndex.value = -1
      }
      break

    default:
      // Type-ahead search functionality
      if (isOpen.value && event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        event.preventDefault()
        handleTypeAhead(event.key)
      }
  }
}

function handleTypeAhead (key) {
  clearTimeout(searchTimeout.value)
  searchQuery.value += key.toLowerCase()

  const matchIndex = props.options.findIndex(option =>
    option.label.toLowerCase().startsWith(searchQuery.value)
  )

  if (matchIndex >= 0) {
    highlightedIndex.value = matchIndex
    scrollToHighlighted()
  }

  // Clear search query after 500ms of inactivity
  searchTimeout.value = setTimeout(() => {
    searchQuery.value = ''
  }, 500)
}

function scrollToHighlighted () {
  setTimeout(() => {
    const highlighted = selectRef.value?.querySelector('[data-highlighted="true"]')
    highlighted?.scrollIntoView({ block: 'nearest' })
  }, 0)
}

function handleOptionMouseEnter (index) {
  highlightedIndex.value = index
}

// lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  clearTimeout(searchTimeout.value)
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
    >
      {{ props.label }}
      <span
        v-if="props.required"
        class="text-danger-500"
        aria-label="required"
      >*</span>
    </label>

    <button
      :id="props.id"
      type="button"
      class="relative w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-10 text-left text-base transition-all hover:border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 sm:text-sm"
      :class="{ 'border-primary-500 ring-4 ring-primary-500/10': isOpen }"
      :aria-expanded="isOpen"
      :aria-controls="`${props.id}-listbox`"
      :aria-labelledby="props.label ? `${props.id}-label` : undefined"
      @click="toggleDropdown"
      @keydown="handleKeyDown"
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
        :aria-labelledby="props.label ? `${props.id}-label` : undefined"
        :aria-activedescendant="highlightedIndex >= 0 ? `${props.id}-option-${highlightedIndex}` : undefined"
      >
        <li
          v-for="(option, index) in props.options"
          :id="`${props.id}-option-${index}`"
          :key="option.value"
          role="option"
          :aria-selected="selectedOption && selectedOption.value === option.value"
          :data-highlighted="index === highlightedIndex"
          class="cursor-pointer px-4 py-2.5 text-base transition-colors sm:text-sm"
          :class="{
            'bg-primary-50 text-primary-700': index === highlightedIndex,
            'bg-primary-100/70 font-semibold text-primary-700': selectedOption && selectedOption.value === option.value,
          }"
          @click="selectOption(option)"
          @mouseenter="handleOptionMouseEnter(index)"
        >
          <div class="flex items-center justify-between">
            <span>{{ option.label }}</span>
            <svg
              v-if="selectedOption && selectedOption.value === option.value"
              class="size-5 text-primary-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>
