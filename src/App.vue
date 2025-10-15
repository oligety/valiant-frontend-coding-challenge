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
    class="mx-auto flex max-w-screen-lg flex-col items-center px-4"
  >
    <header
      id="mainHeader"
    >
      <LayoutHeader />
    </header>

    <main
      id="mainContent"
      class="mt-6 grid gap-6 md:grid-cols-2"
    >
      <RepaymentCalculatorForm
        @updated-repayment-data="updateRepaymentData"
        @reset-form="resetRepaymentData"
      />
      <RepaymentResultWidget
        v-if="repaymentData"
        :repayment-per-period="repaymentData.repaymentPerPeriod"
        :repayment-total="repaymentData.repaymentTotal"
        :interest-rate="repaymentData.interestRate"
      />
      <RepaymentInformationWidget v-else />
    </main>

    <footer
      id="mainFooter"
      class="mt-10"
    >
      <LayoutFooter />
    </footer>
  </div>
</template>
