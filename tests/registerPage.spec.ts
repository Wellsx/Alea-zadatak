// @ts-check
import { expect, test } from "../pages/pages";
import { TextData as text } from "../data/text";
import data from "../data/data";

test.beforeEach("Visits home page", async ({ page }) => {
  await page.goto("/register");
  await expect(page).toHaveURL("/register");
});
test.describe("Registration Page Positive Tests", () => {
  test("Verifies all elements on Register page load correctly", async ({ registerPage }) => {
    await expect(registerPage.registerFormTitle).toBeVisible();
    await expect(registerPage.usernameInput).toBeVisible();
    await expect(registerPage.usernameInput).toBeEmpty();
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.firstNameInput).toBeEmpty();
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeEmpty();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeEmpty();
    await expect(registerPage.confirmPasswordInput).toBeVisible();
    await expect(registerPage.confirmPasswordInput).toBeEmpty();
    await expect(registerPage.registerButton).toBeVisible();
    await expect(registerPage.registerButton).toBeDisabled();
    await expect(registerPage.cancelButton).toBeVisible();
    await expect(registerPage.cancelButton).toBeEnabled();
  });
  test("Verifies Registration flow functions correctly", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.password,
      data.password
    );
    await expect(registerPage.usernameInput).toHaveValue(data.uniqueUsername);
    await expect(registerPage.firstNameInput).toHaveValue(data.firstName);
    await expect(registerPage.lastNameInput).toHaveValue(data.lastName);
    await expect(registerPage.passwordInput).toHaveValue(data.password);
    await expect(registerPage.confirmPasswordInput).toHaveValue(data.password);
    await expect(registerPage.registerButton).toBeEnabled();
    await registerPage.clickButton(registerPage.registerButton);
    await expect(registerPage.successMessage).toBeVisible();
    await expect(registerPage.successMessage).toHaveText(text.registrationSuccess);
    data.save_user(data.uniqueUsername, data.firstName);
  });
  test("Verifies Cancel button works correctly", async ({ registerPage, page }) => {
    await expect(registerPage.cancelButton).toBeVisible();
    await registerPage.clickCancel();
    await expect(page).toHaveURL("/");
  });
  test("Verifies navigation to Home Page from Register Parge", async ({ homePage, page }) => {
    await expect(homePage.homeButton).toBeVisible();
    await homePage.clickButton(homePage.homeButton);
    await expect(page).toHaveURL("/");
  });
});
test.describe("Registration Page Negative Tests", () => {
  test("Verifies 'username' field can't be empty", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.password,
      data.password
    );
    await registerPage.usernameInput.clear();
    await expect(await registerPage.getErrorMEssage(text.loginRequired)).toBeVisible();
    await expect(registerPage.registerButton).toBeDisabled();
  });
  test("Verifies 'firstName' field can't be empty", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.password,
      data.password
    );
    await registerPage.firstNameInput.clear();
    await expect(await registerPage.getErrorMEssage(text.firstnameRequired)).toBeVisible();
    await expect(registerPage.registerButton).toBeDisabled();
  });
  test("Verifies 'lastName' field can't be empty", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.password,
      data.password
    );
    await registerPage.lastNameInput.clear();
    await expect(await registerPage.getErrorMEssage(text.lastnameRequired)).toBeVisible();
    await expect(registerPage.registerButton).toBeDisabled();
  });
  test("Verifies 'password' field can't be empty", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.password,
      data.password
    );
    await registerPage.passwordInput.clear();
    await expect(await registerPage.getErrorMEssage(text.passwordRequired)).toBeVisible();
    await expect(registerPage.registerButton).toBeDisabled();
  });
  test("Verifies 'confirmPassword' field can't be empty", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.password,
      data.password
    );
    await registerPage.confirmPasswordInput.clear();
    await expect(await registerPage.getErrorMEssage(text.passwordMismatch)).toBeVisible();
    await expect(registerPage.registerButton).toBeDisabled();
  });
  test("Verifies 'userName' field can't be longer than 50 characters", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.invalid.longUsername,
      data.firstName,
      data.lastName,
      data.password,
      data.password
    );
    await expect(await registerPage.getErrorMEssage(text.usernameLong)).toBeVisible();
    await expect(registerPage.registerButton).toBeDisabled();
  });
  test("Verifies 'password' field can't be longer than 50 characters", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.invalid.longPassword,
      data.invalid.longPassword
    );
    await registerPage.clickRegister();
    await expect(await registerPage.getErrorMEssage(text.longPassword)).toBeVisible();
  });
  test("Verifies 'password' field can't be shorter than 6 characters", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.invalid.shortPassword,
      data.invalid.shortPassword
    );
    await registerPage.clickRegister();
    await expect(await registerPage.getErrorMEssage(text.shortPassword)).toBeVisible();
  });
  test("Verifies 'password' field must contain an uppercase letter", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.invalid.lowercasePassword,
      data.invalid.lowercasePassword
    );
    await registerPage.clickRegister();
    await expect(await registerPage.getErrorMEssage(text.passwordUppercase)).toBeVisible();
  });
  test("Verifies 'password' field must contain a lowercase letter", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.invalid.uppercasePassword,
      data.invalid.uppercasePassword
    );
    await registerPage.clickRegister();
    await expect(await registerPage.getErrorMEssage(text.passwordLowercase)).toBeVisible();
  });
  test("Verifies 'password' field must contain a symbol character", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.invalid.nosymbolPassword,
      data.invalid.nosymbolPassword
    );
    await registerPage.clickRegister();
    await expect(await registerPage.getErrorMEssage(text.passwordSymbol)).toBeVisible();
  });
  test("Verifies 'password' field must contain a numeric character", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.invalid.nonumberPassword,
      data.invalid.nonumberPassword
    );
    await registerPage.clickRegister();
    await expect(await registerPage.getErrorMEssage(text.passwordNumeric)).toBeVisible();
  });
  test("Verifies 'password' field and 'confirm password' not matching error", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.uniqueUsername,
      data.firstName,
      data.lastName,
      data.password,
      data.invalid.shortPassword
    );
    await expect(await registerPage.getErrorMEssage(text.passwordMismatch)).toBeVisible();
  });
  test("Verifies registering an existing username is not possible", async ({ registerPage }) => {
    await registerPage.fillRegisterInfo(
      data.invalid.existingUsername,
      data.firstName,
      data.lastName,
      data.password,
      data.password
    );
    await registerPage.clickRegister();
    await expect(await registerPage.getErrorMEssage(text.usernameExists)).toBeVisible();
  });
});
