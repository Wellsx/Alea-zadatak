import { BasePage } from "./basePage";
import { TextData as text } from "../data/text";
import data from "../data/data";

export class RegisterPage extends BasePage {
  //selectors
  usernameInput = this.page.locator("#username");
  firstNameInput = this.page.locator("#firstName");
  lastNameInput = this.page.locator("#lastName");
  passwordInput = this.page.locator("#password");
  confirmPasswordInput = this.page.locator("#confirmPassword");
  registerButton = this.page.getByRole("button", { name: "Register" });
  cancelButton = this.page.getByRole("button", { name: "Cancel" });
  successMessage = this.page.locator(".result.alert.alert-success", { hasText: text.registrationSuccess });
  registerFormTitle = this.page.locator(".my-form", { hasText: "Register with Buggy Cars Rating" });

  async fillRegisterInfo(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string
  ) {
    await this.usernameInput.fill(username);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }
  async clickRegister() {
    await this.registerButton.click();
  }
  async clickCancel() {
    await this.cancelButton.click();
  }

  async getErrorMEssage(errorMessage: string) {
    return this.page.locator(".alert.alert-danger", { hasText: errorMessage });
  }
}
