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
    class="flex animate-scale-in flex-col rounded-2xl border-2 border-gray-100 bg-white p-5 shadow-large backdrop-blur-sm transition-all duration-300 hover:border-gray-200 hover:shadow-xl sm:p-6"
  >
    <div class="mb-6 flex items-center justify-between">
      <div
        id="repaymentResultLogoWrapper"
        class="flex items-center gap-3"
      >
        <div class="flex size-12 items-center justify-center rounded-xl bg-success-500 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <svg
            class="size-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div id="repaymentResultTitle">
          <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
            Your Results
          </h2>
          <p class="text-xs text-gray-500 sm:text-sm">
            Estimated loan breakdown
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-1 flex-col space-y-5">
      <!-- Repayments per period -->
      <div
        id="repaymentPerPeriod"
        class="rounded-2xl bg-primary-600 p-8 transition-all hover:scale-[1.02] hover:bg-primary-700"
        aria-live="polite"
      >
        <p class="text-sm font-semibold uppercase tracking-wide text-white/95">
          {{ props.repaymentPeriodLabel }} repayment
        </p>
        <p class="mt-3 text-5xl font-extrabold text-white sm:text-5xl">
          {{ formatCurrency(props.repaymentPerPeriod) }}
        </p>
      </div>

      <!-- Repayments total -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          id="repaymentTotal"
          class="rounded-xl bg-gray-800 p-5 transition-all hover:scale-[1.02] hover:bg-gray-900"
          aria-live="polite"
        >
          <p class="text-sm font-semibold uppercase tracking-wide text-gray-300">
            Total repayment
          </p>
          <p class="mt-2.5 text-xl font-bold text-white">
            {{ formatCurrency(props.repaymentTotal) }}
          </p>
        </div>

        <!-- Interest rate -->
        <div
          id="interestRate"
          class="rounded-xl bg-secondary-600 p-5 transition-all hover:scale-[1.02] hover:bg-secondary-700"
          aria-live="polite"
        >
          <p class="text-sm font-semibold uppercase tracking-wide text-white/95">
            Interest rate
          </p>
          <p class="mt-2.5 text-xl font-bold text-white">
            {{ props.interestRate }}%
          </p>
        </div>
      </div>
    </div>

    <BaseButton
      id="getInTouchButton"
      variant="outline"
      class="mt-6"
      aria-label="Get in touch button"
    >
      Get in touch
    </BaseButton>
  </div>
</template>
