<script setup>
import { computed, onMounted, ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import useRepaymentCalculator from '@/composables/useRepaymentCalculator.js'
import apiService from '@/services/apiService.js'

defineOptions({ name: 'LoanRepaymentCalculatorForm' })

// events
const emit = defineEmits(['updatedRepaymentData', 'resetForm'])

// reactive state
const loanAmount = ref(null)
const selectedLoanPurpose = ref(null)
const selectedRepaymentPeriod = ref(null)
const selectedLoanTerm = ref(null)
const calculationError = ref('')
const loanPurposeList = ref([])
const repaymentPeriodList = ref([])
const loanTermList = ref([])

// computed properties
const isValidForm = computed(() => {
  return selectedLoanPurpose.value && selectedRepaymentPeriod.value && selectedLoanTerm.value && loanAmount.value
})

// composables
const { computeRepayment } = useRepaymentCalculator()

// methods
function calculateRepayment () {
  calculationError.value = ''

  if (!selectedLoanPurpose.value || !selectedRepaymentPeriod.value || !selectedLoanTerm.value) {
    calculationError.value = 'Please complete all fields.'
    return
  }

  const result = computeRepayment({
    amount: loanAmount.value,
    annualRate: selectedLoanPurpose.value.annualRate,
    paymentsPerYear: selectedRepaymentPeriod.value.value,
    totalMonths: selectedLoanTerm.value.value,
  })

  if (!result) {
    calculationError.value = 'Unable to calculate repayment. Check your inputs and try again.'
    return
  }

  emit('updatedRepaymentData', { ...result, repaymentPeriodLabel: selectedRepaymentPeriod.value.label })
}

function resetForm () {
  selectedLoanPurpose.value = null
  selectedRepaymentPeriod.value = null
  selectedLoanTerm.value = null
  loanAmount.value = null
  calculationError.value = ''

  emit('resetForm')
}

async function loadInitialData () {
  calculationError.value = ''
  Promise.all([apiService.getLoanPurposes(), apiService.getRepaymentPeriods(), apiService.getLoanTerms()])
    .then(([loanPurposesResponse, repaymentPeriodsResponse, loanTermsResponse]) => {
      loanPurposeList.value = loanPurposesResponse.data
      repaymentPeriodList.value = repaymentPeriodsResponse.data
      loanTermList.value = loanTermsResponse.data
    })
    .catch(() => {
      calculationError.value = 'Failed to load initial data. Please try again later.'
    })
}

// lifecycle hooks
onMounted(async () => {
  await loadInitialData()
})
</script>

<template>
  <div
    id="repaymentCalculatorForm"
    class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
  >
    <h2 class="mb-4 text-base font-semibold text-gray-900 sm:text-lg">
      Calculate your repayment
    </h2>

    <div class="flex flex-col space-y-3.5">
      <BaseInput
        id="loanAmount"
        v-model="loanAmount"
        label="Loan amount"
        type="text"
        placeholder="e.g. 10000"
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

      <div
        v-if="calculationError"
        class="rounded-lg bg-red-50 p-3 sm:p-4"
        role="alert"
        aria-live="polite"
      >
        <p class="text-xs font-medium text-red-800 sm:text-sm">
          {{ calculationError }}
        </p>
      </div>
    </div>

    <div class="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
      <BaseButton
        id="calculateButton"
        class="w-full"
        :disabled="!isValidForm"
        @click="calculateRepayment"
      >
        Calculate
      </BaseButton>

      <BaseButton
        id="resetButton"
        variant="danger"
        class="w-full"
        @click="resetForm"
      >
        Reset
      </BaseButton>
    </div>
  </div>
</template>
