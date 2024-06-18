import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("?page=projects", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}?page=projects`);
  });

  test("should navigate to project page on grid card click", async ({
    page,
  }) => {
    // select grid layout
    await page.getByTestId("grid-layout-button").click();

    // click grid card
    const projectGridCard = await page.getByTestId("project-grid-card").nth(1);

    await expect(projectGridCard).toBeVisible({ timeout: 10000 });

    await Promise.all([projectGridCard.click(), page.waitForLoadState("load")]);
    const projectViewBtn = page.getByRole("button", {
      name: "See Project page",
    });
    await expect(projectViewBtn).toBeVisible();
    await projectViewBtn.click();
    expect(page.url()).toContain("?page=project&id=");
  });

  test("should navigate to project page on list card click", async ({
    page,
  }) => {
    // select list layout
    await page.getByTestId("list-layout-button").click();

    // click list card
    const projectListCard = await page.getByTestId("project-list-card").nth(1);

    await expect(projectListCard).toBeVisible({ timeout: 10000 });

    await Promise.all([projectListCard.click(), page.waitForLoadState("load")]);
    const projectViewBtn = page.getByRole("button", {
      name: "See Project page",
    });
    await expect(projectViewBtn).toBeVisible();
    await projectViewBtn.click();
    expect(page.url()).toContain("?page=project&id=");
  });

  test.describe("User is not logged in", () => {
    test.use({
      storageState: "playwright-tests/storage-states/wallet-not-connected.json",
    });

    test("'create project' button should be hidden on projects page", async ({
      page,
    }) => {
      const projectButton = await page.getByRole("button", {
        name: "Create Project",
      });
      await expect(projectButton).not.toBeVisible();
    });
  });

  test.describe("User is logged in", () => {
    test.use({
      storageState: "playwright-tests/storage-states/wallet-connected.json",
    });

    test("'create project' button should be visable and bring up modal", async ({
      page,
    }) => {
      const projectButton = await page.getByRole("button", {
        name: "Create Project",
      });
      await expect(projectButton).toBeVisible();

      await projectButton.click();
      const modal = await page.getByTestId("create-project-modal");
      await expect(modal).toBeVisible();
    });

    test.describe("Modal", () => {
      test.beforeEach(async ({ page }) => {
        const projectButton = await page.getByRole("button", {
          name: "Create Project",
        });
        await projectButton.click();
      });

      test("'create own project' should navigate to editor", async ({
        page,
      }) => {
        const createOwnProject = await page.getByText("Create my own project");
        await createOwnProject.click();
        expect(page.url()).toContain("?page=projects&tab=editor");
      });

      test("'import from potlock' should navigate to potlockImport", async ({
        page,
      }) => {
        const importFromPotlock = await page.getByText("Import from Potlock");
        await importFromPotlock.click();
        expect(page.url()).toContain("?page=projects&tab=potlockImport");
      });
    });
  });
});
