import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";
import path from "path";

test.describe("?page=profile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}?page=profile`);
  });

  test.describe("User logged in", () => {
    test.beforeEach(async ({ page }) => {
      // Intercept IPFS requests
      await page.route("**/add", async (route) => {
        const modifiedResponse = {
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ cid: "simple_cid" }),
        };

        // Fulfill the route with the modified response
        await route.fulfill(modifiedResponse);
      });
    });

    test.use({
      storageState: "playwright-tests/storage-states/wallet-connected.json",
    });

    test("should show profile page if no accountId is passed", async ({
      page,
    }) => {
      const profileId = page.getByText("anybody.near").nth(2);
      await expect(profileId).toBeVisible();
    });

    test("should show profile page when accountId is passed", async ({
      page,
    }) => {
      await page.goto(`/${ROOT_SRC}?page=profile&accountId=efiz.testnet`);
      const profileName = page.getByRole("heading", {
        name: "Elliot",
      });
      await expect(profileName).toBeVisible();
    });

    test("should navigate to 'Edit Profile' and save correct data", async ({
      page,
    }) => {
      const editButton = page.getByRole("button", { name: "Edit Profile" });
      await editButton.click();

      // expect input field with label Name to be visible
      const nameInput = page.getByLabel("Name");
      await expect(nameInput).toBeVisible();

      const avatarInput = await page.locator("input[type=file]");
      await avatarInput.setInputFiles(
        path.join(__dirname, "./assets/black.png"),
      );

      await page.route("**/add", async (route) => {
        const modifiedResponse = {
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ cid: "simple_cid" }),
        };

        // Fulfill the route with the modified response
        await route.fulfill(modifiedResponse);
      });

      await page.getByPlaceholder("Enter full name").fill("Someone");

      const description = await page
        .frameLocator("iframe")
        .locator('textarea[name="textarea"]');
      await description.fill("Someone");

      await page.getByPlaceholder("eg. United States").fill("Someone");

      await page.getByPlaceholder("twitter handle").fill("Someone");
      await page.getByPlaceholder("github handle").fill("Someone");
      await page.getByPlaceholder("telegram handle").fill("Someone");
      await page.getByPlaceholder("website link").fill("Someone.com");

      const expectedResult = {
        "anybody.near": {
          profile: {
            name: "Someone",
            description: "Someone",
            image: {
              ipfs_cid: "simple_cid",
            },
            location: "Someone",
            linktree: {
              twitter: "Someone",
              github: "Someone",
              telegram: "Someone",
              website: "Someone.com",
            },
          },
        },
      };
      // click button that triggers transaction
      await page.getByRole("button", { name: "Save Profile" }).nth(0).click();
      const transactionObj = JSON.parse(
        await page.locator("div.modal-body code").innerText(),
      );
      // do something with transactionObj
      expect(transactionObj).toMatchObject(expectedResult);
    });
  });

  test.describe("User not logged in", () => {
    test.use({
      storageState: "playwright-tests/storage-states/wallet-not-connected.json",
    });

    test("should show login prompt if no accountId is passed", async ({
      page,
    }) => {
      await page.goto(`/${ROOT_SRC}?page=profile`);
      const loginPrompt = page.getByText(
        "AccountID prop or signed in account is required",
      );
      await expect(loginPrompt).toBeVisible();
    });

    test("should show profile page when accountId is passed", async ({
      page,
    }) => {
      await page.goto(`/${ROOT_SRC}?page=profile&accountId=efiz.testnet`);
      const profileName = page.getByRole("heading", {
        name: "Elliot",
      });
      await expect(profileName).toBeVisible();
    });

    test("Should navigate to Posts and Show them", async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=profile&accountId=efiz.testnet`);
      const postButton = page.getByRole("tab", { name: "Posts" });
      await postButton.click();

      await expect(postButton).toHaveClass("nav-link active");
    });
    test("Should navigate to NFTs and Show them", async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=profile&accountId=efiz.testnet`);
      const nftButton = page.getByRole("tab", { name: "NFTs" });
      await nftButton.click();

      await expect(nftButton).toHaveClass("nav-link active");
    });
    test("Should navigate to Widgets and Show them", async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=profile&accountId=efiz.testnet`);
      const widgetButton = page.getByRole("tab", { name: "Widgets" });
      await widgetButton.click();

      const widgetTitle = page.getByRole("link", {
        name: "efiz.testnet/widget/SimpleMDE",
      });
      await expect(widgetTitle).toBeVisible({ timeout: 10000 });
    });
    test("Should not navigate to Edit Profile", async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=profile&accountId=efiz.testnet`);
      const profileImageSection = page.locator(".profile-image-section");
      await expect(profileImageSection).toBeVisible();
      // expect no Edit Profile button in the profile image section
      const editProfileButton = page.getByRole("button", {
        name: "Edit Profile",
      });
      await expect(editProfileButton).toBeHidden();
    });
  });
});
