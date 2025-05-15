// @ts-check
import { expect, test, request } from "../pages/pages";
import data from "../data/data";
import user from "../data/registeredUser.json";
import { TextData as text } from "../data/text";

test.beforeEach("Visits Home Page", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page).toHaveURL("/");
});
test.describe("Login Page Positive Tests", () => {
  test("Verifies Login functionality works correctly", async ({ homePage }) => {
    await expect(homePage.usernameInput).toBeVisible();
    await expect(homePage.passwordInput).toBeVisible();
    await expect(homePage.loginButton).toBeVisible();
    await homePage.fillLogin(user.username, data.password);
    await expect(homePage.usernameInput).toHaveValue(user.username);
    await expect(homePage.passwordInput).toHaveValue(data.password);
    await homePage.clickButton(homePage.loginButton);
    await expect(homePage.userGreeting).toBeVisible();
  });
  test("Verifies navbar updates correctly on login", async ({ homePage }) => {
    await apiRegister(data.uniqueUsername, data.firstName, data.lastName, data.password, data.password);
    await homePage.fillLogin(user.username, data.password);
    await homePage.clickButton(homePage.loginButton);
    await expect(homePage.userGreeting).toHaveText(`Hi, ${user.firstname}`);
    await expect(homePage.userGreeting).toBeVisible();
    await expect(homePage.profileButton).toBeVisible();
    await expect(homePage.profileButton).toBeEnabled();
    await expect(homePage.logoutButton).toBeVisible();
    await expect(homePage.logoutButton).toBeEnabled();
    await expect(homePage.usernameInput).not.toBeVisible();
    await expect(homePage.passwordInput).not.toBeVisible();
    await expect(homePage.loginButton).not.toBeVisible();
    await expect(homePage.registerButton).not.toBeVisible();
  });
  test("Verifies logout works correctly", async ({ homePage, page }) => {
    await apiRegister(data.uniqueUsername, data.firstName, data.lastName, data.password, data.password);
    await homePage.fillLogin(user.username, data.password);
    await homePage.clickButton(homePage.loginButton);
    await expect(homePage.logoutButton).toBeVisible();
    await homePage.clickButton(homePage.logoutButton);
    const token = await page.evaluate(() => {
      return localStorage.getItem("token");
    });
    await expect(token).toBeNull;
    await expect(homePage.usernameInput).toBeVisible();
    await expect(homePage.passwordInput).toBeVisible();
    await expect(homePage.loginButton).toBeVisible();
    await expect(homePage.registerButton).toBeVisible();
  });
  test("Verifies that reloading the page the user stays logged in", async ({ homePage, page }) => {
    await apiRegister(data.uniqueUsername, data.firstName, data.lastName, data.password, data.password);
    await homePage.fillLogin(user.username, data.password);
    await homePage.clickButton(homePage.loginButton);
    await expect(homePage.userGreeting).toBeVisible();
    await expect(homePage.profileButton).toBeVisible();
    await expect(homePage.logoutButton).toBeVisible();
    await page.reload();
    await expect(homePage.userGreeting).toBeVisible();
    await expect(homePage.profileButton).toBeVisible();
    await expect(homePage.logoutButton).toBeVisible();
    const token = await page.evaluate(() => {
      return localStorage.getItem("token");
    });
    await expect(token).not.toBeNull;
  });
});
test.describe("Login Page Negative Tests", () => {
  test("Verifies invalid credentials login is not possible", async ({ homePage }) => {
    await expect(homePage.usernameInput).toBeVisible();
    await expect(homePage.passwordInput).toBeVisible();
    await expect(homePage.loginButton).toBeVisible();
    await homePage.fillLogin(user.username, data.invalid.shortPassword);
    await homePage.clickButton(homePage.loginButton);
    await expect(homePage.invalidLoginMsg).toBeVisible();
    await expect(homePage.invalidLoginMsg).toHaveText(text.invalidCredentials);
  });
  test("Verify that username and password field's can't be empty", async ({ homePage }) => {
    await expect(homePage.usernameInput).toBeEmpty();
    await expect(homePage.passwordInput).toBeEmpty();
    await expect(homePage.loginButton).toBeVisible();
    await homePage.clickButton(homePage.loginButton);
    await expect(homePage.usernameInput).toContainClass("ng-invalid");
    await expect(homePage.passwordInput).toContainClass("ng-invalid");
  });
});

//api helpers
async function apiRegister(
  username: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string
) {
  const context = await request.newContext();
  const response = await context.post(data.API_URL + "/prod/users", {
    data: {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: confirmPassword,
    },
  });
  await expect(response).toBeOK();
  data.save_user(username, firstName);
}
