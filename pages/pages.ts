import { test as base } from "@playwright/test";
import { HomePage } from "./homePage";
import { RegisterPage } from "./registerPage";

type MyFixtures = {
  homePage: HomePage;
  registerPage: RegisterPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});
export { expect, request } from "@playwright/test";
