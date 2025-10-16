<script setup>
import { formatCurrency } from '../utils/utils.js'
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
  repaymentPeriodLabel: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    id="repaymentResultWidget"
    class="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
  >
    <h2 class="text-base font-semibold text-gray-900 sm:text-lg">
      Your results
    </h2>

    <div class="mt-4 w-full space-y-3">
      <div
        id="repaymentPerPeriod"
        class="rounded-lg bg-gradient-to-br from-primary-50 to-primary-100/50 p-4 sm:p-5"
        aria-live="polite"
      >
        <h3 class="text-xs font-medium text-gray-600 sm:text-sm">
          Your {{ props.repaymentPeriodLabel }} repayment
        </h3>
        <p class="mt-1.5 text-2xl font-bold text-gray-900 sm:text-3xl">
          {{ formatCurrency(props.repaymentPerPeriod) }}
        </p>
      </div>

      <div
        id="repaymentTotal"
        class="rounded-lg bg-gray-50 p-4 sm:p-5"
        aria-live="polite"
      >
        <h3 class="text-xs font-medium text-gray-600 sm:text-sm">
          Total repayment
        </h3>
        <p class="mt-1.5 text-2xl font-bold text-gray-900 sm:text-3xl">
          {{ formatCurrency(props.repaymentTotal) }}
        </p>
      </div>

      <div
        id="interestRate"
        class="rounded-lg bg-gray-50 p-4 sm:p-5"
        aria-live="polite"
      >
        <h3 class="text-xs font-medium text-gray-600 sm:text-sm">
          Interest rate
        </h3>
        <p class="mt-1.5 text-2xl font-bold text-gray-900 sm:text-3xl">
          {{ props.interestRate }}%
        </p>
      </div>
    </div>

    <BaseButton
      id="getInTouchButton"
      variant="primary"
      class="mt-4 w-full"
    >
      Get in touch
    </BaseButton>
  </div>
</template>
