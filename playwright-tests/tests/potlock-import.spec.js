import { expect, test } from "@playwright/test";
import { MAIN_SRC } from "../util/constants";
test.describe("Potlock import tests", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${MAIN_SRC}?page=projects`);
    await page.waitForTimeout(5000);
  });
  test("Import project", async ({ page }) => {
    const allProjectsBtn = await page.getByRole("button", {
      name: "All Projects",
    });
    await allProjectsBtn.click();
    const createProjectBtn = await page.getByRole("button", {
      name: "Create Project",
    });
    await createProjectBtn.click();
    const importProject = await page.getByText("Import from Potlock");
    await importProject.click();
    await page.waitForTimeout(5000);
    await expect(page.url()).toContain("?page=projects&tab=potlockImport");
    await page.waitForTimeout(5000);
    await page.reload();
    const inputField = await page.getByPlaceholder("Search projects");
    await inputField.fill("bos-workspace");
    await page.waitForTimeout(5000);
    const searchBtn = await page.getByRole("button", { name: "Search" });
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();
    await page.waitForTimeout(2000);
    const potlockCard = await page.getByTestId("potlock-card");
    await expect(potlockCard).toBeVisible({ timeout: 10000 });
  });
});
