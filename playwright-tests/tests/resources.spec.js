import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("?page=resources", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}?page=resources`);
  });

  test("Should navigate to default page", async ({ page }) => {
    const guideButton = await page.getByRole("button", {
      name: "Guide",
    });
    await guideButton.click();
    const pageHeader = await page.getByRole("heading", { name: "Resources" });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to L1 page", async ({ page }) => {
    const workingWithVMButton = await page.getByRole("button", {
      name: "Working with VM",
    });
    await workingWithVMButton.click();
    expect(page.url()).toContain("&tab=vm");
    const pageHeader = await page.getByRole("heading", {
      name: "Working with the VM",
    });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to L2 page", async ({ page }) => {
    const gettingStartedButton = await page.getByRole("button", {
      name: "Getting Started",
    });
    await gettingStartedButton.click();
    const migrationGuideLink = await page.getByRole("link", {
      name: "Migration Guide",
    });
    expect(migrationGuideLink).toBeVisible();
    await migrationGuideLink.click();
    expect(page.url()).toContain("&tab=migrationGuide");
    const pageHeader = await page.getByRole("heading", {
      name: "Migration Guide",
    });
    await expect(pageHeader).toBeVisible();
  });
});
