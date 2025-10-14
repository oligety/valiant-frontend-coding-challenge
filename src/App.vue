<script setup>
import LoanRepaymentCalculatorForm from '@/components/LoanRepaymentCalculatorForm.vue'
import RepaymentInformationWidget from '@/components/RepaymentInformationWidget.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'

defineOptions({
  name: 'App',
})
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
      <LoanRepaymentCalculatorForm />
      <RepaymentInformationWidget />
    </main>

    <footer
      id="mainFooter"
      class="mt-10"
    >
      <LayoutFooter />
    </footer>
  </div>
</template>
