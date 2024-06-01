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

test("To verify that the sign in button is visible in the home page and when clicked navigates to login page", async ({
  page,
}) => {
  const signInButton = page.getByRole("button", { name: "Sign in" }).nth(1);
  await expect(signInButton).toBeVisible();
  await signInButton.click();
  await expect(page).toHaveURL("https://www.nearbuilders.org/join");
});

test("To verify that the user is logged in succesfully", async ({ page }) => {
  await setLocalStorage(page, localStorageData);
  await page.goto("/buildhub.near/widget/components.Navbar");
  const LoggedInButton = page.getByText("anybody.near").nth(1);
  await expect(LoggedInButton).toHaveText("anybody.near");
});
