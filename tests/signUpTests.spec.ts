import {test} from "@playwright/test";
import {SignUpPage} from "../pages/signUpPage";
import {DashboardPage}   from "../pages/dashboardPage";


test('Valid sign up test', async ({page}) => {
    let signUpPage = new SignUpPage(page);
    let dashboardPage = new DashboardPage(page);
    await signUpPage.openMainPage();
    await signUpPage.clickSignUpButton();
    await signUpPage.enterFirstName("TestAccount");
    await signUpPage.enterLastName("Playwright");
    await signUpPage.enterCompanyName("TestTaskCompany");
    await signUpPage.chooseIndustry("Medical");
    await signUpPage.enterEmail("sometestemail+"+Date.now()+"@gmail.com");
    await signUpPage.chooseCountryCode("+32");
    await signUpPage.enterPhone("12345678");
    await signUpPage.enterPassword("somepass123!");
    await signUpPage.submitSignUp();
    await dashboardPage.isDashboardPageOpened();

});

test("Error about missing password is shown when use signups without password", async ({page}) => {
    let signUpPage = new SignUpPage(page);
    await signUpPage.openMainPage();
    await signUpPage.clickSignUpButton();
    await signUpPage.enterFirstName("TestAccount");
    await signUpPage.enterLastName("Playwright");
    await signUpPage.enterCompanyName("TestTaskCompany");
    await signUpPage.chooseIndustry("Medical");
    await signUpPage.enterEmail("sometestemail+"+Date.now()+"@gmail.com");
    await signUpPage.chooseCountryCode("+32");
    await signUpPage.enterPhone("12345678");
    await signUpPage.submitSignUp();
    await signUpPage.errorIsShown("Password is required");
})

test("Error about wrong format of phone is shown if user enter more than 8 digits", async ({page}) => {
    let signUpPage = new SignUpPage(page);
    await signUpPage.openMainPage();
    await signUpPage.clickSignUpButton();
    await signUpPage.enterFirstName("TestAccount");
    await signUpPage.enterLastName("Playwright");
    await signUpPage.enterCompanyName("TestTaskCompany");
    await signUpPage.chooseIndustry("Medical");
    await signUpPage.enterEmail("sometestemail+"+Date.now()+"@gmail.com");
    await signUpPage.chooseCountryCode("+32");
    await signUpPage.enterPhone("1234567890");
    await signUpPage.enterPassword("somepass123!");
    await signUpPage.submitSignUp();
    await signUpPage.errorIsShown("Wrong phone number format");
})
