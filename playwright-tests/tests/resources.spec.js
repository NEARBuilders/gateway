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

  test("Should navigate to 'Working with VM' page", async ({ page }) => {
    const workingWithVMButton = await page.getByRole("button", {
      name: "Working with VM",
    });
    await workingWithVMButton.click();
    const pageHeader = await page.getByRole("heading", {
      name: "Working with the VM",
    });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to 'Getting Started' page", async ({ page }) => {
    const gettingStartedButton = await page.getByRole("button", {
      name: "Getting Started",
    });
    await gettingStartedButton.click();
    const gettingStartedLink = await page.getByRole("link", {
      name: "Getting Started",
    });
    await gettingStartedLink.click();
    const pageHeader = await page.getByRole("heading", {
      name: "bos-workspace",
    });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to 'Migration Guide' page", async ({ page }) => {
    const gettingStartedButton = await page.getByRole("button", {
      name: "Getting Started",
    });
    await gettingStartedButton.click();
    const migrationGuideLink = await page.getByRole("link", {
      name: "Migration Guide",
    });
    await migrationGuideLink.click();
    const pageHeader = await page.getByRole("heading", {
      name: "Migration Guide",
    });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to 'Installation' page", async ({ page }) => {
    const gettingStartedButton = await page.getByRole("button", {
      name: "Getting Started",
    });
    await gettingStartedButton.click();
    const installationLink = await page.getByRole("link", {
      name: "Installation",
    });
    await installationLink.click();
    const pageHeader = await page.getByRole("heading", {
      name: "Installation 🏗️",
    });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to 'Usage' page", async ({ page }) => {
    const usageButton = await page.getByRole("button", {
      name: "Usage",
    });
    await usageButton.click();
    const usageLink = await page.getByRole("link", {
      name: "Usage",
    });
    await usageLink.click();
    const pageHeader = await page.getByRole("heading", { name: "Usage 👷🏽‍♀️" });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to 'Aliases' page", async ({ page }) => {
    const usageButton = await page.getByRole("button", {
      name: "Usage",
    });
    await usageButton.click();
    const aliasesLink = await page.getByRole("link", {
      name: "Aliases",
    });
    await aliasesLink.click();
    const pageHeader = await page.getByRole("heading", { name: "aliases" });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to 'Deploying Widgets' page", async ({ page }) => {
    const deployingWidgetsButton = await page.getByRole("button", {
      name: "Deploying Widgets",
    });
    await deployingWidgetsButton.click();
    const pageHeader = await page.getByRole("heading", { name: "Deployment" });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to 'Web 4.0 Deployment' page", async ({ page }) => {
    const web4Button = await page.getByRole("button", {
      name: "Web 4.0 Deployment",
    });
    await web4Button.click();
    const pageHeader = await page.getByRole("heading", {
      name: "deploy to web4",
    });
    await expect(pageHeader).toBeVisible();
  });

  test("Should navigate to 'Adding New Resources' page", async ({ page }) => {
    const newResourcesButton = await page.getByRole("button", {
      name: "Adding New Resources",
    });
    await newResourcesButton.click();
    const pageHeader = await page.getByRole("heading", {
      name: "Adding new Resources",
    });
    await expect(pageHeader).toBeVisible();
  });
});
