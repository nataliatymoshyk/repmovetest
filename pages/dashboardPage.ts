import {expect} from "@playwright/test";


export  class DashboardPage {
    readonly page;

    constructor(page) {
        this.page = page;
    }

    async isDashboardPageOpened() {
        await expect(this.page).toHaveURL(/.*dashboard/, {timeout: 15000});
        console.log("Page  is loaded");
        await expect(this.page).toHaveTitle('Dashboard | RepMove');
    }
}
