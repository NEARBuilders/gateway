import { test, expect } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("?page=projects&tab=editor", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}?page=projects&tab=editor`);
  });

  test.describe("User is not logged in", () => {
    test.use({
      storageState: "playwright-tests/storage-states/wallet-not-connected.json",
    });

    test("editor page should prompt user to log in", async ({ page }) => {
      // This needs to be fixed, editor still shows up
    });
  });

  test.describe("User is logged in", () => {
    test.use({
      storageState: "playwright-tests/storage-states/wallet-connected.json",
    });

    test("should not allow next when empty required fields", async ({
      page,
    }) => {
      // title
      // description
    });

    test("should complete flow and save data correctly with images populated", async ({
      page,
    }) => {
      const expectedTransactionData = {};

      // title
      // description
      // tags
      // images

      // click button that triggers transaction
      await page.getByRole("button", { name: "Create" }).nth(1).click();
      const transactionObj = JSON.parse(
        await page.locator("div.modal-body code").innerText(),
      );
      // do something with transactionObj
      expect(transactionObj).toMatchObject(expectedTransactionData);
    });
  });
});
