import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("?page=profile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}?page=profile`);
  });

  test.describe("User logged in", () => {
    test.use({
      storageState:
        "playwright-tests/storage-states/wallet-connected-project-owner.json",
    });

    test("should show profile page if no accountId is passed", async ({
      page,
    }) => {
      const profileId = page.getByText("meghagoel.testnet").nth(2);
      await expect(profileId).toBeVisible();
    });

    test("Should show profile page when accountId is passed", async ({
      page,
    }) => {
      await page.goto(`/${ROOT_SRC}?page=profile&accountId=efiz.testnet`);
      const profileName = page.getByRole("heading", {
        name: "Elliot",
      });
      await expect(profileName).toBeVisible();
    });

    test("Should navigate to Posts and Show them", async ({ page }) => {
      const postButton = page.getByRole("tab", { name: "Posts" });
      await postButton.click();

      await expect(postButton).toHaveClass("nav-link active");
    });
    test("Should navigate to NFTs and Show them", async ({ page }) => {
      const nftButton = page.getByRole("tab", { name: "NFTs" });
      await nftButton.click();

      await expect(nftButton).toHaveClass("nav-link active");
    });
    test("Should navigate to Widgets and Show them", async ({ page }) => {
      const widgetButton = page.getByRole("tab", { name: "Widgets" });
      await widgetButton.click();

      const widgetTitle = page.getByRole("heading", {
        name: "components.rfps.Rfp",
      });
      await expect(widgetTitle).toBeVisible({ timeout: 10000 });
    });

    test("Should navigate to Edit Profile and Show Options", async ({
      page,
    }) => {
      const editButton = page.getByRole("button", { name: "Edit Profile" });
      await editButton.click();

      // expect input field with label Name to be visible
      const nameInput = page.getByLabel("Name");
      await expect(nameInput).toBeVisible();
    });
  });

  test.describe("User not logged in", () => {
    test.use({
      storageState: "playwright-tests/storage-states/wallet-not-connected.json",
    });

    test("Should show login prompt if no accountId is passed", async ({
      page,
    }) => {
      await page.goto(`/${ROOT_SRC}?page=profile`);
      const loginPrompt = page.getByText(
        "AccountID prop or signed in account is required",
      );
      await expect(loginPrompt).toBeVisible();
    });

    test("Should show profile page when accountId is passed", async ({
      page,
    }) => {
      await page.goto(`/${ROOT_SRC}?page=profile&accountId=efiz.testnet`);
      const profileName = page.getByRole("heading", {
        name: "Elliot",
      });
      await expect(profileName).toBeVisible();
    });
  });
});
