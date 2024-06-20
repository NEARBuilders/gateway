import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("Navbar", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });

  test("Notifications", async ({ page }) => {
    const notificationsButton = page.locator("i.bi.bi-bell").nth(0);
    await page.waitForTimeout(1000);
    await notificationsButton.click();
    await expect(page).toHaveURL(/.*\?page=notifications/);
  });

  test("View source", async ({ page }) => {
    const btn = page.locator("i.bi.bi-three-dots");
    await page.waitForTimeout(1000);
    await expect(btn).toBeVisible();
    await btn.click();
    const viewSourceOption = page.getByText("View source", { exact: true });
    await page.waitForTimeout(1000);
    await expect(viewSourceOption).toBeVisible();
    await viewSourceOption.click();
    await expect(page).toHaveURL(
      /.*\?page=inspect&widgetPath=builddao.testnet\/widget\/page.home.Index/,
    );
    await page.waitForTimeout(2000);
    expect(
      page.locator("a.btn.btn-sm.btn-outline-secondary.border-0").nth(0),
    ).toHaveText("Source");
  });

  test("Edit Code", async ({ page }) => {
    const btn1 = page.locator("i.bi.bi-three-dots");
    await page.waitForTimeout(1000);
    await expect(btn1).toBeVisible();
    await btn1.click();
    const editCodeOption = page.getByText("Edit code", { exact: true });
    await page.waitForTimeout(1000);
    await expect(editCodeOption).toBeVisible();
    await editCodeOption.click();
    await expect(page).toHaveURL(/.*\/edit\//);
  });
  test("Network Button -Mainet", async ({ page }) => {
    const networkButton = page.getByText("Network", { exact: true });
    await page.waitForTimeout(1000);
    await expect(networkButton).toBeVisible();
    await networkButton.click();
    const mainetOption = page.getByText("Mainnet", { exact: true });
    await page.waitForTimeout(1000);
    await expect(mainetOption).toBeVisible();
    await mainetOption.click();
    await page.waitForTimeout(1000);
    if (page.url().includes(ROOT_SRC)) {
      expect(page.url()).toContain("/builddao.near/widget/Index");
    } else {
      expect(page.url()).toContain("https://www.nearbuilders.org/");
    }
  });
  test("Network Button -Testnet", async ({ page }) => {
    const networkButton = page.getByText("Network", { exact: true });
    await page.waitForTimeout(1000);
    await expect(networkButton).toBeVisible();
    await networkButton.click();
    const testnetOption = page.getByText("Testnet", { exact: true });
    await page.waitForTimeout(1000);
    await expect(testnetOption).toBeVisible();
    await testnetOption.click();
    await page.waitForTimeout(1000);
    if (page.url().includes(ROOT_SRC)) {
      expect(page.url()).toContain(`/${ROOT_SRC}`);
    } else {
      expect(page.url()).toContain("https://test.nearbuilders.org/");
    }
  });
});
