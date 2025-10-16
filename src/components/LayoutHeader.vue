<script setup>
import logo from '@/assets/Valiant_Logo_Horizontal_Black.png'

defineOptions({ name: 'LayoutHeader' })
</script>

<template>
  <div
    id="layoutHeader"
    class="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
  >
    <img
      :src="logo"
      alt="Valiant Finance logo"
      class="h-8 w-auto sm:h-10"
    >
    <h1 class="text-lg font-semibold text-gray-900 sm:text-xl">
      Loan Repayment Calculator
    </h1>
  </div>
</template>
