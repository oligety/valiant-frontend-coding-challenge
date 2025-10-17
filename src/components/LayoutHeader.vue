<script setup>
defineOptions({ name: 'LayoutHeader' })

// Preload logo for faster rendering
const logoUrl = new URL('@/assets/valiant_logo.svg', import.meta.url).href

</script>

<template>
  <div
    id="layoutHeader"
    class="animate-fade-in"
  >
    <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
      <!-- Logo and Title -->
      <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        <div class="group relative shrink-0 pr-3">
          <a
            href="https://www.valiantfinance.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Valiant Finance website"
          >
            <img
              :src="logoUrl"
              alt="Valiant Finance logo"
              class="relative h-8 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10"
            >
          </a>
        </div>
        <div class="flex-1 sm:flex-initial">
          <h1 class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-lg font-bold leading-tight text-transparent sm:text-xl md:text-2xl">
            Loan Repayment Calculator
          </h1>
          <p class="mt-1 text-xs text-gray-600 sm:text-sm">
            Calculate your loan repayments instantly
          </p>
        </div>
      </div>
    </div>

    <div class="relative mt-6">
      <div
        class="absolute inset-0 flex items-center"
        aria-hidden="true"
      >
        <div class="w-full border-t-2 border-gray-100" />
      </div>
      <div class="relative flex justify-center">
        <div class="flex gap-1">
          <span class="size-2 rounded-full bg-primary-200" />
          <span class="size-2 rounded-full bg-secondary-200" />
          <span class="size-2 rounded-full bg-primary-200" />
        </div>
      </div>
    </div>
  </div>
</template>
