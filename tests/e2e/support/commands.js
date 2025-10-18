Cypress.Commands.add('assertEmptyFormValues', () => {
  cy.get('input[id="loanAmount"]').should('have.value', '')
  cy.get('#loanPurpose > span').should('have.text', 'Select loan purpose')
  cy.get('#loanPeriod > span').should('have.text', 'Select repayment period')
  cy.get('#loanTerm > span').should('have.text', 'Select loan term')
})

Cypress.Commands.add('enterCalculationFormValues', (loanAmount) => {
  cy.get('input[id="loanAmount"]').type(loanAmount)
  cy.get('#loanPurpose').click()
  cy.get('#loanPurpose').press('Enter')
  cy.get('#loanPeriod').click()
  cy.get('#loanPeriod').press('Enter')
  cy.get('#loanTerm').click()
  cy.get('#loanTerm').press('Enter')
})
