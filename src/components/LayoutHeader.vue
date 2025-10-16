<script setup>
import logo from '@/assets/Valiant_Logo_Horizontal_Black.png'

defineOptions({ name: 'LayoutHeader' })
</script>

<template>
  <div
    id="layoutHeader"
    class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
  >
    <img
      :src="logo"
      alt="Valiant Finance logo"
      class="h-10 w-auto sm:h-12"
    >
    <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">
      Loan Repayment Calculator
    </h1>
  </div>
</template>
