<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

defineOptions({ name: 'LoanRepaymentCalculatorForm' })

const loanAmount = ref('')
const loanPurposeList = ref([
  {
    label: 'Day-to-day capital',
    value: 'general',
    annualRate: 0.1,
  },
  {
    label: 'Vehicle or transport',
    value: 'vehicle',
    annualRate: 0.045,
  },
  {
    label: 'Financing a property',
    value: 'property',
    annualRate: 0.029,
  },
])
const repaymentPeriodList = ref([
  {
    label: 'Weekly',
    value: 52,
  },
  {
    label: 'Fortnightly',
    value: 26,
  },
  {
    label: 'Monthly',
    value: 12,
  },
])
const loanTermList = ref([
  {
    label: '6 months',
    value: 6,
  },
  {
    label: '12 months',
    value: 12,
  },
  {
    label: '2 years',
    value: 24,
  },
  {
    label: '3 years',
    value: 36,
  },
  {
    label: '5 years',
    value: 60,
  },
  {
    label: '10 years',
    value: 120,
  },
  {
    label: '20 years',
    value: 240,
  },
])
const selectedLoanPurpose = ref('')
const selectedRepaymentPeriod = ref('')
const selectedLoanTerm = ref('')

function calculateRepayment () {
  // TODO: Implement loan repayment calculation logic
}

function resetForm () {
  selectedLoanPurpose.value = ''
  selectedRepaymentPeriod.value = ''
  selectedLoanTerm.value = ''
  loanAmount.value = ''
}
</script>

<template>
  <div
    id="loanCalculatorForm"
    class="rounded-lg border border-gray-200 p-4 shadow-sm"
  >
    <div class="flex flex-col space-y-4">
      <BaseInput
        id="loanAmount"
        v-model="loanAmount"
        label="Loan amount"
        type="text"
      />

      <BaseSelect
        id="loanPurpose"
        v-model="selectedLoanPurpose"
        label="Loan purpose"
        :options="loanPurposeList"
        placeholder="Select loan purpose"
      />

      <BaseSelect
        id="loanPeriod"
        v-model="selectedRepaymentPeriod"
        label="Repayment period"
        :options="repaymentPeriodList"
        placeholder="Select repayment period"
      />

      <BaseSelect
        id="loanTerm"
        v-model="selectedLoanTerm"
        label="Loan term"
        :options="loanTermList"
        placeholder="Select loan term"
      />
    </div>

    <div class="mt-4 flex items-center justify-between gap-3">
      <BaseButton
        id="calculateButton"
        class="w-full"
        @click="calculateRepayment"
      >
        Calculate
      </BaseButton>

      <BaseButton
        id="resetButton"
        variant="secondary"
        class="w-full"
        @click="resetForm"
      >
        Reset
      </BaseButton>
    </div>
  </div>
</template>
