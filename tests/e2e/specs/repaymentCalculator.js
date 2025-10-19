describe('repayment calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('default repayment calculator state', () => {
    // check that input values are empty
    cy.assertEmptyFormValues()

    // check button state
    cy.get('button[id="calculateButton"]').should('have.attr', 'disabled')
    cy.get('button[id="resetButton"]').should('not.have.attr', 'disabled')
    cy.get('#repaymentInformationWidget').should('exist')
  })

  it('successful calculation', () => {
    // button is disabled until all fields are filled
    cy.get('button[id="calculateButton"]').should('have.attr', 'disabled')

    // information widget is visible
    cy.get('#repaymentInformationWidget').should('exist')

    // result widget is not visible
    cy.get('#repaymentResultWidget').should('not.exist')

    // input / select values
    cy.enterCalculationFormValues('10000')

    // calculate button is enabled after all fields are filled
    cy.get('button[id="calculateButton"]').should('not.have.attr', 'disabled')

    // click button to calculate
    cy.get('button[id="calculateButton"]').click()

    // information widget is not visible
    cy.get('#repaymentInformationWidget').should('not.exist')

    // result widget is visible
    cy.get('#repaymentResultWidget').should('exist')
    cy.get('#repaymentPerPeriod').should('exist')
    cy.get('#repaymentTotal').should('exist')
    cy.get('#interestRate').should('exist')
  })

  it('validation error when loan amount is below minimal value', () => {
    // fill out form with invalid loan amount
    cy.enterCalculationFormValues('999')

    // calculate button is disabled with invalid loan amount
    cy.get('button[id="calculateButton"]').should('have.attr', 'disabled')

    // check validation error message
    cy.get('#loanAmount-error').should('exist')
    cy.get('#loanAmount-error').should('contain.text', 'Minimum loan amount is')
  })

  it('validation error when loan amount is above maximal value', () => {
    // fill out form with invalid loan amount
    cy.enterCalculationFormValues('20000001')

    // calculate button is disabled with invalid loan amount
    cy.get('button[id="calculateButton"]').should('have.attr', 'disabled')

    // check validation error message
    cy.get('#loanAmount-error').should('exist')
    cy.get('#loanAmount-error').should('contain.text', 'Maximum loan amount is')
  })

  it('value reset when click reset button', () => {
    // button is disabled until all fields are filled
    cy.get('button[id="calculateButton"]').should('have.attr', 'disabled')

    // information widget is visible
    cy.get('#repaymentInformationWidget').should('exist')

    // result widget is not visible
    cy.get('#repaymentResultWidget').should('not.exist')

    // fill out form with valid values
    cy.enterCalculationFormValues('10000')

    // click button to reset
    cy.get('button[id="resetButton"]').click()

    // check that input values are empty
    cy.assertEmptyFormValues()
  })
})
