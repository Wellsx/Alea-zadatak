// @ts-check
import { expect, test } from "../pages/pages";
import { TextData as text } from "../data/text";

test.describe("Home Page test suite", () => {
  test.beforeEach("Visit home page", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page).toHaveURL("/");
    await expect(page).toHaveTitle(text.homeTitle);
  });

  test("Verify home page loads correctly", async ({ homePage }) => {
    await expect(homePage.homeButton).toBeVisible();
    await expect(homePage.homeButton).toHaveText(text.homeButton);
    await expect(homePage.loginButton).toBeVisible();
    await expect(homePage.loginButton).toHaveText(text.loginButton);
    await expect(homePage.registerButton).toBeVisible();
    await expect(homePage.registerButton).toHaveText(text.registerButton);
    await expect(homePage.usernameInput).toBeVisible();
    await expect(homePage.passwordInput).toBeVisible();
    const cardTexts = [text.card1, text.card2, text.card3];
    for (const cardText of cardTexts) {
      const card = await homePage.getCards(cardText);
      await expect(card).toBeVisible();
      await expect(card).toHaveText(cardText);
    }
    const images = homePage.images;
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
    }
    await expect(homePage.socialFacebook).toBeVisible();
    await expect(homePage.socialTwitter).toBeVisible();
  });
  test("Verify cards", async ({ homePage }) => {
    await expect(homePage.main).toBeVisible();
  });
});
