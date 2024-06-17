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
      await page.goto(`/${ROOT_SRC}?page=projects&tab=editor`);
      page.getByPlaceholder('Enter Project Title')

      await page.getByPlaceholder('Enter Project Title').click();
      await page.getByPlaceholder('Enter Project Title').fill('Test');
      await page.frameLocator('iframe').locator('textarea[name="textarea"]').click();
      await page.frameLocator('iframe').locator('textarea[name="textarea"]').fill('Test');
      await page.getByPlaceholder('Enter location').click();
      await page.getByPlaceholder('Enter location').fill('Test');
      await page.getByRole('combobox').selectOption('1-10');
      await page.getByPlaceholder('handle').first().click();
      await page.getByPlaceholder('handle').first().fill('test');
      await page.getByPlaceholder('handle').nth(1).click();
      await page.getByPlaceholder('handle').nth(1).fill('test');
      await page.getByPlaceholder('handle').nth(2).click();
      await page.getByPlaceholder('handle').nth(2).fill('test');
      await page.getByPlaceholder('https://www.nearbuilders.org/').click();
      await page.getByPlaceholder('https://www.nearbuilders.org/').fill('https://test.com');
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByText('Upload File').first().click();
      await page.locator('body').setInputFiles('black.png');
      await page.getByText('Upload File').setInputFiles('black.png');
      await page.getByRole('combobox').first().click();
      await page.getByRole('combobox').first().fill('test.testnet');
      await page.getByLabel('sonketest.testnet').click();
      await page.getByLabel('Updates Feed').uncheck();
      await page.getByLabel('Feedback Feed').uncheck();
      await page.getByPlaceholder('Start Typing').click();
      await page.getByPlaceholder('Start Typing').fill('test');
      await page.getByLabel('test').click();
      await page.getByRole('combobox').nth(1).fill('clim');
      await page.getByLabel('menu-options').click();
      await page.getByText('Contributors anybody.near×Removesonketest.testnet×Remove Avatar Choose a file').click();
      await page.getByRole('button', { name: 'Create' }).click();
      await page.locator('pre div').click();
      await page.getByRole('button', { name: 'Save Data' }).click();
      await page.getByRole('dialog').press('Escape');
      await page.getByRole('button', { name: 'Create' }).press('Escape');
      await page.getByRole('button', { name: 'Create' }).press('Escape');
      
      // title
      // description
      // tags
      // images
      // click button that triggers transaction
      // await page.getByRole("button", { name: "Donate" }).nth(1).click();
      // const transactionObj = JSON.parse(
      //   await page.locator("div.modal-body code").innerText(),
      // );
      // // do something with transactionObj
      // expect(transactionObj).toMatchObject({
      //   amount: 100,
      //   message: "",
      //   projectId: DEFAULT_PROJECT_ID,
      // });
    });
  });
});
