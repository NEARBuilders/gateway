import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("Navbar tabs redirection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("Home", async ({ page }) => {
    const homeTab = page.locator("span", { hasText: "Home" });
    await homeTab.click();
    expect(page.url()).toContain("?page=home");
    await page.waitForTimeout(1000);
    expect(
      page.getByText(
        "Designed to support builders in a multi-chain ecosystem.",
        { exact: true },
      ),
    ).toBeVisible();
  });

  test("Activity", async ({ page }) => {
    const activityTab = page.locator("span", { hasText: "Activity" });
    await activityTab.click();
    expect(page.url()).toContain("?page=activity");
    await page.waitForTimeout(1000);
    expect(page.getByText("All Feed", { exact: true })).toBeVisible();
  });
  test("Projects", async ({ page }) => {
    const projectsTab = page.getByRole("link", {
      name: "Projects",
      exact: true,
    });
    await projectsTab.click();
    expect(page.url()).toContain("?page=projects");
    await page.waitForTimeout(2000);
    expect(
      page.getByText(
        "Easily create, share, and track all projects within our vibrant builder community",
        { exact: true },
      ),
    ).toBeVisible();
  });
  test("Resources", async ({ page }) => {
    const resourcesTab = page.locator("span", { hasText: "Resources" });
    await resourcesTab.click();
    expect(page.url()).toContain("?page=resources");
    await page.waitForTimeout(2000);
    expect(page.getByText("Current Build DAO", { exact: true })).toBeVisible();
  });
});

test.describe("User is logged in", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("Start project redirection for logged in users", async ({ page }) => {
    const startProjectButton = page.getByRole("button", {
      name: "Start Project",
    });
    await expect(startProjectButton).toBeVisible();
    await startProjectButton.click();
    expect(page.url()).toContain("?page=projects&tab=editor");
  });
  test("Explore Projects redirection for logged in user", async ({ page }) => {
    const exploreProjectsButton = page.getByRole("button", {
      name: "Explore Project",
    });
    await expect(exploreProjectsButton).toBeVisible();
    await exploreProjectsButton.click();
    expect(page.url()).toContain("?page=projects");
  });

  test("Quickstart Guide page redirection", async ({ page }) => {
    const quickStartGuideButton = page.getByRole("button", {
      name: "Quickstart Guide",
    });
    await expect(quickStartGuideButton).toBeVisible();
    await quickStartGuideButton.click();
    expect(page.url()).toContain("/NEARBuilders/quickstart.near");
  });

  test("Workspace docs page redirection", async ({ page }) => {
    const workSpaceButton = page.getByRole("button", {
      name: "Workspace Docs",
    });
    await page.waitForTimeout(2000);
    await expect(workSpaceButton).toBeVisible();
    await workSpaceButton.click();
    expect(page.url()).toContain("/?page=resources&tab=gettingStarted");
  });
  test("Activity page redirection", async ({ page }) => {
    const activityPageButton = page.getByRole("button", {
      name: "Activity",
    });
    await expect(activityPageButton).toBeVisible();
    await activityPageButton.click();
    expect(page.url()).toContain("?page=activity");
  });

  test("Twitter redirection", async ({ page }) => {
    const twitterButton = page.locator("button[type=icon]").nth(3);
    await page.waitForTimeout(2000);
    await expect(twitterButton).toBeVisible();
    await twitterButton.click();
    expect(page.url()).toContain("twitter");
  });
  test("Telegram redirection", async ({ page }) => {
    const telegramButton = page.locator("button[type=icon]").nth(4);
    await page.waitForTimeout(2000);
    await expect(telegramButton).toBeVisible();
    await telegramButton.click();
    expect(page.url()).toBe("https://www.nearbuilders.com/tg-builders");
  });
  test("Github redirection", async ({ page }) => {
    const githubButton = page.locator("button[type=icon]").nth(5);
    await page.waitForTimeout(2000);
    await expect(githubButton).toBeVisible();
    await githubButton.click();
    expect(page.url()).toBe("https://github.com/NEARBuilders");
  });
});

test.describe("User is not logged in", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-not-connected.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("Start project redirection for logged out users", async ({ page }) => {
    const startProjectButton = page.getByRole("button", {
      name: "Start Project",
    });
    await expect(startProjectButton).toBeVisible();
    await startProjectButton.click();
    expect(page.url()).toContain("?page=projects&tab=editor");
    await page.waitForTimeout(2000);
    const connectButton = page.getByRole("button", { name: "Connect" });
    await expect(connectButton).toBeVisible();
  });
});
