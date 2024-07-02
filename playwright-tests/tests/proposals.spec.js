import { expect, test } from "@playwright/test";
import { MAINNET_ROOT_SRC } from "../util/constants";

test.describe("?page=activity&tab=proposals", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${MAINNET_ROOT_SRC}?page=activity&tab=proposals`);
  });

  test.describe("Wallet connected: should be able to create proposal", () => {
    test.use({
      storageState:
        "playwright-tests/storage-states/mainnet-wallet-connected.json",
    });

    test.beforeEach(async ({ page }) => {
      page.waitForTimeout(1000);
      await page.getByText("Create Proposal").click();
    });

    test("should create 'Text' proposal", async ({ page }) => {
      page.waitForSelector("");
    });

    //   test("should create 'Transfer' proposal", async ({
    //     page,
    //   }) => {

    //   });
    //   test("should create 'Function call' proposal", async ({
    //     page,
    //   }) => {

    //   });
    //   test("should create 'Add member to role' proposal", async ({
    //     page,
    //   }) => {

    //   });

    //   test("should create 'Remove member to role' proposal", async ({
    //     page,
    //   }) => {

    //   });
  });
});
