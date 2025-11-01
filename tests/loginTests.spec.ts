
import {LoginPage} from "../pages/loginPage";
import {DashboardPage} from "../pages/dashboardPage";
import { test} from '../fixtures/signUpFixture';


test ('Valid login test', async ({signedUpAccount, freshPage }) => {
    const {email, password} = signedUpAccount;
    let loginPage = new LoginPage(freshPage);
    let dashboardPage = new DashboardPage(freshPage);
    await loginPage.openLoginPage();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickSignInButton();
    await dashboardPage.isDashboardPageOpened();

})

test('Error when login with not registered email', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.enterEmail("sometest@gmail.com");
    await loginPage.enterPassword("sometest1234");
    await loginPage.clickSignInButton();
    await loginPage.errorAlertIsShown('Invalid to login');
})

test('Error when login with incorrect password', async ({ signedUpAccount,freshPage }) => {
    const {email} = signedUpAccount;
    let loginPage = new LoginPage(freshPage);
    await loginPage.openLoginPage();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword("wrongpass1234");
    await loginPage.clickSignInButton();
    await loginPage.errorAlertIsShown('Invalid to login');
})
