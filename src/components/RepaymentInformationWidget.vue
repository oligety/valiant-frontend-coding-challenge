<script setup>
defineOptions({ name: 'RepaymentInformationWidget' })
</script>

<template>
  <div
    id="repaymentInformationWidget"
    class="flex animate-fade-in flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 text-center sm:p-8 md:p-12"
  >
    <!-- Animated Icon -->
    <div class="relative mb-6">
      <div class="absolute inset-0 animate-ping rounded-full bg-primary-400 opacity-20" />
      <div class="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 shadow-medium">
        <svg
          class="size-10 text-primary-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <h2 class="mb-3 text-xl font-semibold text-gray-900">
      Your results will appear here
    </h2>
    <p class="mb-6 max-w-sm text-sm text-gray-600">
      Fill in the loan details on the left to calculate your repayment amount and see personalized results.
    </p>

    <!-- Steps -->
    <div class="flex flex-col gap-2 text-left text-sm">
      <div class="flex items-center gap-2 text-gray-600">
        <div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
          1
        </div>
        <span>Enter your loan amount</span>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
          2
        </div>
        <span>Select loan purpose and terms</span>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
          3
        </div>
        <span>Click calculate to see results</span>
      </div>
    </div>
  </div>
</template>
