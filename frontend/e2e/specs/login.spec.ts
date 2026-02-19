import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  // US1: Sign In with Email and Password
  test("renders all required elements", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
    await expect(
      page.getByText("Access your case-law-parser account.")
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Log in" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Forgot password?" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create an account" })
    ).toBeVisible();
  });

  test("submit button is enabled when form is idle", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Log in" })).toBeEnabled();
  });

  test("submit button is re-enabled after submission completes", async ({
    page,
  }) => {
    await page.locator("#email").fill("user@example.com");
    await page.locator("#password").fill("secret123");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByRole("button", { name: "Log in" })).toBeEnabled();
  });

  // US2: HTML5 Form Validation
  test("email input has correct attributes", async ({ page }) => {
    const emailInput = page.locator("#email");
    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(emailInput).toHaveAttribute("autocomplete", "email");
    await expect(emailInput).toHaveAttribute("required", "");
  });

  test("password input has correct attributes", async ({ page }) => {
    const passwordInput = page.locator("#password");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(passwordInput).toHaveAttribute(
      "autocomplete",
      "current-password"
    );
    await expect(passwordInput).toHaveAttribute("required", "");
  });

  test("blocks submission when email is empty", async ({ page }) => {
    await page.locator("#password").fill("secret123");
    await page.getByRole("button", { name: "Log in" }).click();
    const emailInput = page.locator("#email");
    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).not.toBe("");
  });

  test("blocks submission when password is empty", async ({ page }) => {
    await page.locator("#email").fill("user@example.com");
    await page.getByRole("button", { name: "Log in" }).click();
    const passwordInput = page.locator("#password");
    const validationMessage = await passwordInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).not.toBe("");
  });

  test("blocks submission with invalid email format", async ({ page }) => {
    await page.locator("#email").fill("notanemail");
    await page.locator("#password").fill("secret123");
    await page.getByRole("button", { name: "Log in" }).click();
    const emailInput = page.locator("#email");
    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).not.toBe("");
  });

  // US3: Secondary Actions
  test("forgot password button is visible and focusable", async ({ page }) => {
    const btn = page.getByRole("button", { name: "Forgot password?" });
    await expect(btn).toBeVisible();
    await btn.focus();
    await expect(btn).toBeFocused();
  });

  test("create an account button is visible and focusable", async ({
    page,
  }) => {
    const btn = page.getByRole("button", { name: "Create an account" });
    await expect(btn).toBeVisible();
    await btn.focus();
    await expect(btn).toBeFocused();
  });

  test("form is keyboard navigable", async ({ page }) => {
    await page.locator("#email").focus();
    await page.keyboard.press("Tab");
    await expect(page.locator("#password")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Log in" })).toBeFocused();
  });
});
