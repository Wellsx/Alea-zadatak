import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  //selectors
  homeButton = this.page.getByRole("link", { name: "Buggy Rating" });
  usernameInput = this.page.locator('input[name="login"]');
  passwordInput = this.page.locator('input[name="password"]');
  loginButton = this.page.locator('button[type="submit"]:has-text("Login")');
  registerButton = this.page.getByRole("link", { name: "Register" });
  invalidLoginMsg = this.page.locator(".label-warning", { hasText: "Invalid username/password" });
  main = this.page.getByRole("main").first();
  images = this.page.locator("img.img-fluid");
  socialFacebook = this.page.getByTitle("Facebook");
  socialTwitter = this.page.getByTitle("Twitter");

  //logged in selectors
  userGreeting = this.page.locator(".nav-item", { hasText: "Hi, " });
  profileButton = this.page.locator(".nav-item", { hasText: "Profile" });
  logoutButton = this.page.locator(".nav-item", { hasText: "Logout" });

  async goToHome() {
    await this.page.goto("/");
  }

  async fillLogin(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async clickButton(button) {
    await button.click();
  }
  async getCards(card: string) {
    return this.page.locator(".card-header", { hasText: card });
  }
}
