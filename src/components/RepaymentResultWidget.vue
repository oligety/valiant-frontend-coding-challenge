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
    class="animate-scale-in rounded-2xl border-2 border-gray-100 bg-white p-5 shadow-large backdrop-blur-sm transition-all duration-300 hover:border-gray-200 hover:shadow-xl sm:p-6"
  >
    <div class="mb-5 flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-success-500 to-success-600 shadow-medium">
        <svg
          class="size-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-gray-900">
        Your results
      </h2>
    </div>

    <div class="flex flex-col space-y-4">
      <!-- Primary Result -->
      <div
        id="repaymentPerPeriod"
        class="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 ring-2 ring-primary-200"
        aria-live="polite"
      >
        <p class="text-xs font-medium uppercase tracking-wider text-white/90">
          {{ props.repaymentPeriodLabel }} repayment
        </p>
        <p class="mt-2 text-4xl font-bold text-white">
          {{ formatCurrency(props.repaymentPerPeriod) }}
        </p>
      </div>

      <!-- Secondary Results Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div
          id="repaymentTotal"
          class="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 ring-2 ring-gray-100"
          aria-live="polite"
        >
          <p class="text-xs font-medium text-gray-600">
            Total repayment
          </p>
          <p class="mt-2 text-xl font-bold text-gray-900">
            {{ formatCurrency(props.repaymentTotal) }}
          </p>
        </div>

        <div
          id="interestRate"
          class="rounded-xl bg-gradient-to-br from-secondary-50 to-secondary-100 p-4 ring-2 ring-secondary-100"
          aria-live="polite"
        >
          <p class="text-xs font-medium text-secondary-700">
            Interest rate
          </p>
          <p class="mt-2 text-xl font-bold text-secondary-900">
            {{ props.interestRate }}%
          </p>
        </div>
      </div>
    </div>

    <BaseButton
      id="getInTouchButton"
      variant="secondary"
      class="mt-6 w-full"
      aria-label="Get in touch button"
    >
      <svg
        class="mr-2 size-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      Get a quote
    </BaseButton>
  </div>
</template>
