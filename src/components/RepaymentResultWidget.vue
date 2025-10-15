<script setup>

import BaseButton from '@/components/BaseButton.vue'

defineOptions({ name: 'RepaymentResultWidget' })

const props = defineProps({
  repaymentPerPeriod: {
    type: Number,
    default: 0,
  },
  repaymentTotal: {
    type: Number,
    default: 0,
  },
  interestRate: {
    type: Number,
    default: 0,
  },
})

// methods
function formatCurrency (value) {
  if (typeof value !== 'number') {
    return value // Or handle as an error
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
</script>

<template>
  <div
    id="repaymentResultWidget"
    class="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center shadow-sm"
  >
    <h2 class="text-xl font-semibold">
      Your results
    </h2>

    <div
      id="repaymentPerPeriod"
      class="mt-4"
      aria-live="polite"
    >
      <h3>Your weekly repayment</h3>
      <p class="text-2xl font-semibold">
        {{ formatCurrency(props.repaymentPerPeriod) }}
      </p>
    </div>

    <div
      id="repaymentTotal"
      class="mt-4"
      aria-live="polite"
    >
      <h3>Total repayment</h3>
      <p class="text-2xl font-semibold">
        {{ formatCurrency(props.repaymentTotal) }}
      </p>
    </div>

    <div
      id="interestRate"
      class="mt-4"
      aria-live="polite"
    >
      <h3>Interest</h3>
      <p class="text-2xl font-semibold">
        {{ props.interestRate }}%
      </p>
    </div>

    <BaseButton
      id="getInTouchButton"
      variant="secondary"
      class="mt-4"
    >
      Get in touch
    </BaseButton>
  </div>
</template>
