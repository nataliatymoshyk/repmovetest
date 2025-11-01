import {expect, Page} from "@playwright/test";


export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openLoginPage() {
        await this.page.goto('https://dev-repmove-enterprise.web.app/');
        await expect(this.page).toHaveURL(/.*sign-in/, {timeout: 15000});
        console.log("Page  is loaded");
        await expect(this.page).toHaveTitle('Sign In | RepMove');
        return this;
    }

    async enterEmail(email: string) {
        await expect(this.page.locator('input[type="email"]')).toBeVisible();
        await this.page.locator('input[type="email"]').fill(email);
    }

    async enterPassword(password: string) {
        await this.page.locator('input[type="password"]').fill(password);
    }

    async clickSignInButton() {
        await this.page.getByRole('button', {name: 'Sign In', exact: true}).click();
    }

    async errorAlertIsShown(text: string) {
        await expect(this.page.getByRole('alert', {name: text})).toBeVisible();
    }

}
