import { test, expect } from "@playwright/test";
import jsonData from "../storage-states/wallet-connected.json";

const originFilter = jsonData.origins[0];
const localStorageData = originFilter.localStorage;

async function setLocalStorage(page, data) {
  for (const item of data) {
    await page.evaluate(({ name, value }) => {
      localStorage.setItem(name, value);
    }, item);
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8080");
  await page.goto("/buildhub.near/widget/components.Navbar");
});

test("To verify that the sign out button is visible in the dropdown and when clicked navigates to logout page", async ({
  page,
}) => {
  await setLocalStorage(page, localStorageData);
  await page.goto("/buildhub.near/widget/components.buttons.UserDropdown");
  const LoggedInButton = page.getByRole("button", { name: "anybody.near" });
  await expect(LoggedInButton).toHaveText("anybody.near");
  await LoggedInButton.click();
  const dropdownItems = await page.$$(".dropdown-item");
  const secondDropdownItem = dropdownItems[1];
  await secondDropdownItem.click();
  expect(page).toHaveURL("/logout");
});

test("To verify that the user is logged out succesfully", async ({ page }) => {
  await page.goto("/buildhub.near/widget/components.Navbar");
  const signInButton = page.getByRole("button", { name: "Sign in" }).nth(1);
  await expect(signInButton).toBeVisible();
});
