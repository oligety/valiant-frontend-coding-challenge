<script setup>
import { ref } from 'vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import RepaymentCalculatorForm from '@/components/RepaymentCalculatorForm.vue'
import RepaymentInformationWidget from '@/components/RepaymentInformationWidget.vue'
import RepaymentResultWidget from '@/components/RepaymentResultWidget.vue'

defineOptions({
  name: 'App',
})

// reactive state
const repaymentData = ref(null)

// methods
function updateRepaymentData (data) {
  repaymentData.value = data
}
function resetRepaymentData () {
  repaymentData.value = null
}
</script>

<template>
  <div
    id="mainLayout"
    class="flex min-h-screen flex-col bg-gray-50"
  >
    <header
      id="mainHeader"
      class="mx-auto w-full max-w-content px-4 pt-6 sm:pt-8"
    >
      <LayoutHeader />
    </header>

    <main
      id="mainContent"
      class="mx-auto mt-6 w-full max-w-content flex-1 px-4 sm:mt-8"
    >
      <div class="grid gap-6 lg:grid-cols-2">
        <RepaymentCalculatorForm
          @updated-repayment-data="updateRepaymentData"
          @reset-form="resetRepaymentData"
        />
        <RepaymentResultWidget
          v-if="repaymentData"
          :repayment-per-period="repaymentData.repaymentPerPeriod"
          :repayment-total="repaymentData.repaymentTotal"
          :interest-rate="repaymentData.interestRate"
          :repayment-period-label="repaymentData.repaymentPeriodLabel"
        />
        <RepaymentInformationWidget v-else />
      </div>
    </main>

    <footer
      id="mainFooter"
      class="mt-12"
    >
      <LayoutFooter />
    </footer>
  </div>
</template>
