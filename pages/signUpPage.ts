import {expect, Page} from "@playwright/test";

export class SignUpPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openMainPage() {
        await this.page.goto('https://dev-repmove-enterprise.web.app/');
        return this;
    }

    async clickSignUpButton() {
        let signUplink = this.page.getByRole('button', {name: 'Sign Up Now'});
        await (expect(signUplink).toBeVisible());
        await signUplink.click();
        await (expect(this.page).toHaveTitle('Sign Up | RepMove'));
        return this;
    }

    async enterFirstName(firstName: string) {
        await this.page.locator('app-input').filter({hasText: 'First Name'}).getByRole('textbox').fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.page.locator('app-input').filter({hasText: 'Last Name'}).getByRole('textbox').fill(lastName);

    }

    async enterEmail(email: string) {
        await this.page.locator('input[type="email"]').fill(email);
    }

    async enterCompanyName(password: string) {
        await this.page.locator('app-input').filter({hasText: 'Company Name'}).getByRole('textbox').fill(password);
    }

    async chooseIndustry(industry: string) {
        await this.page.locator('ng-select').filter({hasText: 'Industry'}).getByRole('combobox').click();
        await this.page.getByRole('option', {name: industry}).click();

    }

    async chooseCountryCode(countryCode: string) {
        await this.page.locator('app-phone-number').getByRole('combobox').click()
        await this.page.getByRole('option', {name: countryCode}).click();
    }

    async enterPhone(phone: string) {
        await this.page.locator('app-input').filter({hasText: 'Phone'}).locator('input[type="text"]').fill(phone);
    }

    async enterPassword(password: string) {
        await this.page.locator('input[type="password"]').fill(password);
    }

    async submitSignUp() {
        await this.page.getByRole('button', {name: 'Sign Up', exact: true}).click();
    }

    async errorIsShown(error: string) {
        expect(this.page.getByText(error).isVisible());
    }
}
