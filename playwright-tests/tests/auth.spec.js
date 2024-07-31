import { test, expect } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("User is not logged in", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });

  test.use({
    storageState: "playwright-tests/storage-states/wallet-not-connected.json",
  });

  test("should open wallet selector modal when click sign-in", async ({
    page,
  }) => {
    const loginButton = page.getByRole("button", { name: "Sign In" });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const modal = page.getByRole("heading", { name: "Connect Your Wallet" });
    await expect(modal).toBeVisible();
  });

  test("should show sign in button and navigate to login page when clicked via non build dao", async ({
    page,
  }) => {
    await page.route("https://httpbin.org/headers", async (route) => {
      route.fulfill({
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          headers: {
            ...route.request().headers(),
            Origin: "https://near.social",
          },
        }),
      });
    });

    const signInButton = page.getByRole("button", { name: "Sign In" });
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

  test("should show user is logged in succesfully in user dropdown", async ({
    page,
  }) => {
    const LoggedInButton = page.getByRole("button", {
      name: "saswat_test.testnet",
    });
    await expect(LoggedInButton).toHaveText("saswat_test.testnet");
  });

  test("should show sign out button in the dropdown and navigate to logout page when clicked", async ({
    page,
  }) => {
    await page.route("https://httpbin.org/headers", async (route) => {
      route.fulfill({
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          headers: {
            ...route.request().headers(),
            Origin: "https://near.social",
          },
        }),
      });
    });

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
