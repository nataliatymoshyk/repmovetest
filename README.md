# repmovetest

The test were done using Playwright (1.56) and Typescript.

To install the test on local machine, follow the steps below:
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npx playwright install` to install the necessary browsers
4. Run `npx playwright test` to execute the tests

Note: the tests will be run in --headed mode, to see the browser actions. You can change this in the `playwright.config.ts` file by setting `headless: true` in the `use` section.
