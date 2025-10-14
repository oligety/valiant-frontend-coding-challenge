<script setup>

defineOptions({ name: 'RepaymentInformationWidget' })

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

</script>

<template>
  <div
    id="repaymentInformation"
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
        ${{ props.repaymentPerPeriod }}
      </p>
    </div>

    <div
      id="repaymentTotal"
      class="mt-4"
      aria-live="polite"
    >
      <h3>Total repayment</h3>
      <p class="text-2xl font-semibold">
        ${{ props.repaymentTotal }}
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
  </div>
</template>
