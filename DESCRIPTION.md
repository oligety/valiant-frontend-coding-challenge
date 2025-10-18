# Valiant frontend coding challenge - Olivier Liechti

## To-dos

- [x] Create initial component structure
  - [x] Main layout
    - [x] Header
    - [x] Main content
    - [x] Footer
  - [x] Loan calculator form
    - [x] Input component
    - [x] Button component
    - [x] Select component
  - [x] Repayment widget
- [x] Create initial styling
  - [x] Main layout
  - [x] Loan calculator form
  - [x] Repayment widget
  - [x] Responsive design
- [x] Implement calculation logic
- [x] Add API service
- [x] Add / review input validation
- [x] Add / review error handling
- [x] Add / review accessibility
- [ ] Add internationalisation
- [x] Create unit tests
  - [x] Components
  - [x] Services
  - [x] Utilities
- [x] Create E2E tests
  - [x] Successful form submission
  - [x] Unsuccessful form submission
  - [x] Form validation
  - [x] Repayment widget
- [x] Update documentation

## Project summary

### Used tools

- JetBrains IntelliJ IDEA
- JetBrains AI assistant
- Google Stitch
- Google Lighthouse

### Considerations and notes

#### State management

I considered using Pinia for managing the state. However, I decided to not use it for this small project. The reason is that I wanted to keep the project as simple as possible.

#### Using composable vs. service

Early on I decided to trigger the repayment calculation via button click instead of "live" calculation after every input change. Reasoning: the user usually knows the loan amount needed. Therefore, I decided to have the calculation logic in a stateless service instead of a stateful composable.

#### Further improvements

- Internationalisation to support multiple languages
- E2E tests: add 'data-testid' in components and use in Cypress tests instead of 'id' and CSS selectors to follow best practices
- Add axios interceptors to improve API error handling