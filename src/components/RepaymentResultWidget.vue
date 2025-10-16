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
    class="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
  >
    <h2 class="text-xl font-semibold text-gray-900">
      Your results
    </h2>

    <div class="mt-6 w-full space-y-4">
      <div
        id="repaymentPerPeriod"
        class="rounded-lg bg-gradient-to-br from-primary-50 to-primary-100/50 p-5"
        aria-live="polite"
      >
        <h3 class="text-sm font-medium text-gray-600">
          Your {{ props.repaymentPeriodLabel }} repayment
        </h3>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ formatCurrency(props.repaymentPerPeriod) }}
        </p>
      </div>

      <div
        id="repaymentTotal"
        class="rounded-lg bg-gray-50 p-5"
        aria-live="polite"
      >
        <h3 class="text-sm font-medium text-gray-600">
          Total repayment
        </h3>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ formatCurrency(props.repaymentTotal) }}
        </p>
      </div>
    </div>

    <div
      id="interestRate"
      class="rounded-lg bg-gray-50 p-4"
      aria-live="polite"
    >
      <h3 class="text-sm font-medium text-gray-600">
        Interest
      </h3>
      <p class="mt-1 text-3xl font-bold text-gray-900">
        {{ props.interestRate }}%
      </p>
    </div>

    <BaseButton
      id="getInTouchButton"
      variant="primary"
      class="mt-6 w-full"
    >
      Get in touch
    </BaseButton>
  </div>
</template>
