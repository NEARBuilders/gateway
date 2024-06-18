import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("Navbar and it's elements are visible and redirected to their respective pages", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("Home", async ({ page }) => {
    const homeTab = page.locator("span", { hasText: "Home" });
    await homeTab.click();
    expect(page.url()).toContain("?page=home");
  });

  test("Activity", async ({ page }) => {
    const activityTab = page.locator("span", { hasText: "Activity" });
    await activityTab.click();
    expect(page.url()).toContain("?page=activity");
  });
  test("Projects", async ({ page }) => {
    const projectsTab = page.getByRole("link", {
      name: "Projects",
      exact: true,
    });
    await projectsTab.click();
    expect(page.url()).toContain("?page=projects");
  });
  test("Resources", async ({ page }) => {
    const resourcesTab = page.locator("span", { hasText: "Resources" });
    await resourcesTab.click();
    expect(page.url()).toContain("?page=resources");
  });
});

test.describe("Start project redirection for logged in users ", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("User is logged in", async ({ page }) => {
    const startProjectButton = page.getByRole("button", {
      name: "Start Project",
    });
    await expect(startProjectButton).toBeVisible();
    await startProjectButton.click();
    expect(page.url()).toContain("?page=projects&tab=editor");
  });
});

test.describe("Start project redirection for logged out users", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-not-connected.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("User is not logged in", async ({ page }) => {
    const startProjectButton = page.getByRole("button", {
      name: "Start Project",
    });
    await expect(startProjectButton).toBeVisible();
    await startProjectButton.click();
    expect(page.url()).toContain("/join");
  });
});

test.describe("Explore Projects redirection for logged in user", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("User is logged in", async ({ page }) => {
    const exploreProjectsButton = page.getByRole("button", {
      name: "Explore Project",
    });
    await expect(exploreProjectsButton).toBeVisible();
    await exploreProjectsButton.click();
    expect(page.url()).toContain("?page=projects");
  });
});

test.describe("Explore Projects for logged out user", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-not-connected.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("User is logged out", async ({ page }) => {
    const exploreProjectsButton = page.getByRole("button", {
      name: "Explore Project",
    });
    await expect(exploreProjectsButton).toBeVisible();
    await exploreProjectsButton.click();
    expect(page.url()).toContain("/join");
  });
});

test.describe("Quickstart guide", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("Quickstart Guide page redirection", async ({ page }) => {
    const quickStartGuideButton = page.getByRole("button", {
      name: "Quickstart Guide",
    });
    await expect(quickStartGuideButton).toBeVisible();
    await quickStartGuideButton.click();
    expect(page.url()).toContain("/NEARBuilders/quickstart.near");
  });
});

test.describe("Workspace docs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("Workspace docs page redirection", async ({ page }) => {
    const workSpaceButton = page.getByRole("button", {
      name: "Workspace Docs",
    });
    await expect(workSpaceButton).toBeVisible();
    await workSpaceButton.click();
    expect(page.url()).toContain("/?page=resources&tab=gettingStarted");
  });
});

test.describe("Activity Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("Activity page redirection", async ({ page }) => {
    const activityPageButton = page.getByRole("button", {
      name: "Activity",
    });
    await expect(activityPageButton).toBeVisible();
    await activityPageButton.click();
    expect(page.url()).toContain("?page=activity");
  });
});

test.describe("Social Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}`);
  });
  test("Twitter redirection", async ({ page }) => {
    const twitterButton = page.locator("button[type=icon]").nth(1);

    await expect(twitterButton).toBeVisible();
    await twitterButton.click();
    expect(page.url()).toBe("https://x.com/NearBuilders");
  });
  test("Telegram redirection", async ({ page }) => {
    const telegramButton = page.locator("button[type=icon]").nth(2);

    await expect(telegramButton).toBeVisible();
    await telegramButton.click();
    expect(page.url()).toBe("https://www.nearbuilders.com/tg-builders");
  });
  test("Github redirection", async ({ page }) => {
    const githubButton = page.locator("button[type=icon]").nth(3);

    await expect(githubButton).toBeVisible();
    await githubButton.click();
    expect(page.url()).toBe("https://github.com/NEARBuilders");
  });
});
