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

test.describe("Landing page redirection", () => {
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
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByTestId("twitter").click(),
    ]);

    // Wait for the new page to load completely
    await newPage.waitForLoadState("domcontentloaded");

    // Assert that the new page has the expected URL
    expect(newPage.url()).toContain("https://x.com/NearBuilders");
  });

  test("Telegram redirection", async ({ page }) => {
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByTestId("telegram").click(),
    ]);

    // Wait for the new page to load completely
    await newPage.waitForLoadState("domcontentloaded");

    // Assert that the new page has the expected URL
    expect(newPage.url()).toContain("https://www.nearbuilders.com/tg-builders");
  });

  test("Github redirection", async ({ page }) => {
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByTestId("github").click(),
    ]);

    // Wait for the new page to load completely
    await newPage.waitForLoadState("domcontentloaded");

    // Assert that the new page has the expected URL
    expect(newPage.url()).toContain("https://github.com/NEARBuilders");
  });
});
