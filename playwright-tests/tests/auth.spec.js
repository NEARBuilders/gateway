import { test, expect } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("User is not logged in", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-not-connected.json",
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });

  test("To verify that the sign in button is visible in the home page and when clicked navigates to login page", async ({
    page,
  }) => {
    const signInButton = page.getByRole("button", { name: "Sign in" }).nth(1);
    await expect(signInButton).toBeVisible();
    await signInButton.click();
    expect(page.url()).toContain("/join");
  });
});

test.describe("User is logged in", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });

  test("To verify that the user is logged in succesfully", async ({ page }) => {
    const LoggedInButton = page.getByRole("button", {
      name: "saswat_test.testnet",
    });
    await expect(LoggedInButton).toHaveText("saswat_test.testnet");
  });

  test("To verify that the sign out button is visible in the dropdown and when clicked navigates to logout page", async ({
    page,
  }) => {
    const LoggedInButton = page.getByRole("button", {
      name: "saswat_test.testnet",
    });
    await expect(LoggedInButton).toHaveText("saswat_test.testnet");
    await LoggedInButton.click();
    const dropdownItems = await page.$$(".dropdown-item");
    const secondDropdownItem = dropdownItems[1];
    await secondDropdownItem.click();
    expect(page.url()).toContain("/logout");
  });
});
