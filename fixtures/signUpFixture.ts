import { test as base, chromium, Browser, Page, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';

type Fixtures = {
    signedUpAccount: { email: string; password: string };
    freshPage: Page;
};

export const test = base.extend<Fixtures>({
    signedUpAccount: async ({}, use) => {
        // open temporary browser for setup
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        const signUpPage = new SignUpPage(page);
        const email = `sometestemail+${Date.now()}@gmail.com`;
        const password = 'somePass123!';

        await signUpPage.openMainPage();
        await signUpPage.clickSignUpButton();
        await signUpPage.enterFirstName('TestAccount');
        await signUpPage.enterLastName('Playwright');
        await signUpPage.enterCompanyName('TestTaskCompany');
        await signUpPage.chooseIndustry('Medical');
        await signUpPage.enterEmail(email);
        await signUpPage.chooseCountryCode('+32');
        await signUpPage.enterPhone('12345678');
        await signUpPage.enterPassword(password);
        await signUpPage.submitSignUp();

        await expect(page).toHaveURL(/.*dashboard/, {timeout: 15000});
        await expect(page).toHaveTitle('Dashboard | RepMove');

        await browser.close();

        await use({ email, password });
    },

    freshPage: async ({ browser }, use) => {
        // open a new fresh context/page for the actual test
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
});

export { expect };
