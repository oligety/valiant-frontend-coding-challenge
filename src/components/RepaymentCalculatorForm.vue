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
const loanAmount = ref('')
const loanAmountError = ref('')
const selectedLoanPurpose = ref(null)
const selectedRepaymentPeriod = ref(null)
const selectedLoanTerm = ref(null)
const calculationError = ref('')
const loanPurposeList = ref([])
const repaymentPeriodList = ref([])
const loanTermList = ref([])

// constants
const MIN_LOAN_AMOUNT = 1000
const MAX_LOAN_AMOUNT = 20000000

// computed properties
const isValidLoanAmount = computed(() => {
  if (!loanAmount.value) return false
  const numValue = parseInt(loanAmount.value.replace(/\s/g, ''), 10)
  return !isNaN(numValue) && numValue >= MIN_LOAN_AMOUNT && numValue <= MAX_LOAN_AMOUNT
})

const isValidForm = computed(() => {
  return (
    isValidLoanAmount.value &&
      selectedLoanPurpose.value &&
      selectedRepaymentPeriod.value &&
      selectedLoanTerm.value &&
      !loanAmountError.value
  )
})

// composables
const { computeRepayment } = useRepaymentCalculator()

// methods
function formatCurrency (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function validateLoanAmount () {
  loanAmountError.value = ''

  if (!loanAmount.value || loanAmount.value.trim() === '') {
    loanAmountError.value = 'Loan amount is required.'
    return false
  }

  const cleanValue = loanAmount.value.replace(/\s/g, '')
  const numValue = parseInt(cleanValue, 10)

  if (isNaN(numValue)) {
    loanAmountError.value = 'Please enter a valid number.'
    return false
  }

  if (numValue < MIN_LOAN_AMOUNT) {
    loanAmountError.value = `Minimum loan amount is ${formatCurrency(MIN_LOAN_AMOUNT)}.`
    return false
  }

  if (numValue > MAX_LOAN_AMOUNT) {
    loanAmountError.value = `Maximum loan amount is ${formatCurrency(MAX_LOAN_AMOUNT)}.`
    return false
  }

  return true
}

function handleLoanAmountInput (event) {
  // Remove any non-digit characters except spaces
  let value = event.target.value.replace(/[^\d\s]/g, '')

  // Remove all spaces first
  value = value.replace(/\s/g, '')

  // Prevent leading zeros
  if (value.length > 1 && value[0] === '0') {
    value = value.replace(/^0+/, '')
  }

  loanAmount.value = value

  // Clear error when user starts typing (but don't validate yet)
  if (loanAmountError.value && value.length > 0) {
    loanAmountError.value = ''
  }
  if (loanAmount.value) {
    validateLoanAmount()
  }
}

function calculateRepayment () {
  calculationError.value = ''

  // Validate all fields
  if (!validateLoanAmount()) {
    return
  }

  if (!selectedLoanPurpose.value || !selectedRepaymentPeriod.value || !selectedLoanTerm.value) {
    calculationError.value = 'Please complete all fields.'
    return
  }

  const cleanAmount = loanAmount.value.replace(/\s/g, '')
  const result = computeRepayment({
    amount: parseInt(cleanAmount, 10),
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
  loanAmount.value = ''
  loanAmountError.value = ''
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
    class="animate-slide-up rounded-2xl border-2 border-gray-100 bg-white p-5 shadow-large backdrop-blur-sm transition-all duration-300 hover:border-gray-200 hover:shadow-xl sm:p-6"
  >
    <div class="mb-5 flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-medium">
        <svg
          class="size-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-gray-900">
        Calculate your repayment
      </h2>
    </div>

    <div class="flex flex-col space-y-4">
      <div>
        <BaseInput
          id="loanAmount"
          v-model="loanAmount"
          label="Loan amount"
          type="text"
          inputmode="numeric"
          placeholder="e.g. 10'000"
          :error="loanAmountError"
          :success="!loanAmountError && isValidLoanAmount"
          :required="true"
          @input="handleLoanAmountInput"
        >
          <template #prefix>
            <span class="text-lg font-bold text-gray-500">$</span>
          </template>
        </BaseInput>
      </div>

      <BaseSelect
        id="loanPurpose"
        v-model="selectedLoanPurpose"
        label="Loan purpose"
        :options="loanPurposeList"
        :required="true"
        placeholder="Select loan purpose"
      />

      <BaseSelect
        id="loanPeriod"
        v-model="selectedRepaymentPeriod"
        label="Repayment period"
        :options="repaymentPeriodList"
        :required="true"
        placeholder="Select repayment period"
      />

      <BaseSelect
        id="loanTerm"
        v-model="selectedLoanTerm"
        label="Loan term"
        :options="loanTermList"
        :required="true"
        placeholder="Select loan term"
      />

      <div
        v-if="calculationError"
        class="animate-fade-in rounded-xl bg-danger-50 p-4 ring-2 ring-danger-100"
        role="alert"
        aria-live="polite"
      >
        <div class="flex items-start gap-3">
          <svg
            class="size-5 shrink-0 text-danger-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-sm font-medium text-danger-700">
            {{ calculationError }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
      <BaseButton
        id="calculateButton"
        class="w-full"
        :disabled="!isValidForm"
        @click="calculateRepayment"
      >
        <svg
          class="mr-2 size-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        Calculate
      </BaseButton>

      <BaseButton
        id="resetButton"
        variant="outline"
        class="w-full"
        @click="resetForm"
      >
        <svg
          class="mr-2 size-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Reset
      </BaseButton>
    </div>
  </div>
</template>
