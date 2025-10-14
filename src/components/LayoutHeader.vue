<script setup>
import logo from '@/assets/Valiant_Logo_Horizontal_Black.png'

defineOptions({ name: 'LayoutHeader' })
</script>

<template>
  <div
    id="layoutHeader"
    class="flex flex-col items-start gap-3 md:flex-row md:items-center"
  >
    <img
      :src="logo"
      alt="Valiant Finance logo"
      class="h-10 w-auto"
    >
    <h1 class="text-xl font-semibold md:text-2xl">
      Loan Repayment Calculator
    </h1>
  </div>
</template>
