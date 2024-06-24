import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.describe("?page=projects", () => {
  test.describe("Explore Projects", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=projects`);
    });

    test("should navigate to project page on grid card click", async ({
      page,
    }) => {
      // select grid layout
      await page.getByTestId("grid-layout-button").click();

      // click grid card
      const projectGridCard = await page
        .getByTestId("project-grid-card")
        .nth(1);

      await expect(projectGridCard).toBeVisible({ timeout: 10000 });

      await Promise.all([
        projectGridCard.click(),
        page.waitForLoadState("load"),
      ]);
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
      const projectListCard = await page
        .getByTestId("project-list-card")
        .nth(1);

      await expect(projectListCard).toBeVisible({ timeout: 10000 });

      await Promise.all([
        projectListCard.click(),
        page.waitForLoadState("load"),
      ]);
      const projectViewBtn = page.getByRole("button", {
        name: "See Project page",
      });
      await expect(projectViewBtn).toBeVisible();
      await projectViewBtn.click();
      expect(page.url()).toContain("?page=project&id=");
    });

    test.describe("User is not logged in", () => {
      test.use({
        storageState:
          "playwright-tests/storage-states/wallet-not-connected.json",
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

      test("'create project' button should be visible and bring up modal", async ({
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
          const createOwnProject = await page.getByText(
            "Create my own project",
          );
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

  test.describe("My Project Page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=projects&tab=myProjects`);
    });

    test.describe("Wallet is not connected", () => {
      test("should see login screen'", async ({ page }) => {
        const requireLogin = await page.getByText(
          "Please log in in order to see your projects!",
        );

        await expect(requireLogin).toBeVisible();
      });
    });

    test.describe("Project owner wallet is connected", () => {
      test.use({
        storageState:
          "playwright-tests/storage-states/wallet-connected-project-owner.json",
      });

      test.beforeEach(async ({ page }) => {
        const editBtn = page.getByTestId("edit-btn");
        await expect(editBtn).toBeVisible();
        await editBtn.click();
        expect(page.url()).toContain("?page=projects&tab=editor");
      });

      test("should be able to edit a project", async ({ page }) => {
        // wait for data to be fetched
        await page.waitForTimeout(5000);
        const expectedTransactionData = {
          "meghagoel.testnet": {
            project: {
              "testing-project-on-builddao": {
                "": '{"title":"New project title","description":"New Project description","profileImage":{"ipfs_cid":"bafkreifk42ibqsg5sfky5tlhkfty6rkup5leqite5koenhesnuwq55kufi"},"backgroundImage":{"ipfs_cid":"bafkreidbfu7uxtr4is7wxileg3mrbajve6cgkfmrqemc6pxsr6nnczz7ly"},"tags":{"test":""},"linktree":{"twitter":"https://test.nearbuilders.org/","github":"https://test.nearbuilders.org/","telegram":"https://test.nearbuilders.org/","website":"https://test.nearbuilders.org/"},"contributors":["meghagoel.testnet"],"tabs":["overview","activity","tasks","updatesfeed","feedbackfeed"],"projectAccountId":"meghagoel.testnet","teamSize":"1-10","location":"New Location"}',
                metadata: {
                  name: "New project title",
                  description: "New Project description",
                },
              },
            },
          },
        };
        // update title, description and location
        const titleInput = page.getByPlaceholder("Enter Project Title");
        await expect(titleInput).toHaveValue("Testing project on Build DAO");
        titleInput.fill("New project title");
        const descriptionInput = await page
          .frameLocator("iframe")
          .locator('textarea[name="textarea"]');
        await expect(descriptionInput).toHaveText("This is the description", {
          timeout: 20000,
        });
        await descriptionInput.click();
        await descriptionInput.fill("New Project description");
        const locationInput = page.getByPlaceholder("Enter location");

        await locationInput.fill("New Location");
        await page.getByRole("button", { name: "Next" }).click();

        await page.getByRole("button", { name: "Save Changes" }).nth(0).click();
        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });

      test("should be able to delete a project'", async ({ page }) => {
        const deleteBtn = page.getByRole("button", {
          name: "Delete Project",
        });
        await expect(deleteBtn).toBeVisible();
        await deleteBtn.click();
        await page.getByRole("button", { name: "Confirm" }).click();
        const expectedTransactionData = {
          "meghagoel.testnet": {
            project: {
              "testing-project-on-builddao": null,
            },
            "builddao.testnet": {
              project: {
                "meghagoel.testnet_project_testing-project-on-builddao": null,
              },
            },
          },
        };
        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });
    });
  });

  test.describe("Watchlist", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=projects&tab=watchList`);
    });

    test.describe("User is not logged in", () => {
      test.use({
        storageState:
          "playwright-tests/storage-states/wallet-not-connected.json",
      });

      test("should see login screen", async ({ page }) => {
        const requireLogin = await page.getByText(
          "Please log in in order to see watchlist projects!",
        );
        await expect(requireLogin).toBeVisible();
      });
    });

    test.describe("User is logged in with bookmarked project", () => {
      test.use({
        storageState:
          "playwright-tests/storage-states/wallet-connected-project-owner.json",
      });
      test("should see their bookmarked projects", async ({ page }) => {
        const projectTitle = await page.getByText(
          "Testing project on Build DAO",
        );
        await expect(projectTitle).toBeVisible({ timeout: 10000 });
      });
    });

    test.describe("User without bookmarked projects is logged in", () => {
      test.use({
        storageState: "playwright-tests/storage-states/wallet-connected.json",
      });
      test("should see empty page", async ({ page }) => {
        const noProjectFound = await page.getByText("No Projects Found");
        await expect(noProjectFound).toBeVisible();
      });
    });
  });

  test.describe("Projects Involved", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=projects&tab=involvedProjects`);
    });

    test.describe("User is not logged in", () => {
      test.use({
        storageState:
          "playwright-tests/storage-states/wallet-not-connected.json",
      });
      test("should see login screen", async ({ page }) => {
        const requireLogin = await page.getByText(
          "Please log in in order to see involved projects!",
        );
        await expect(requireLogin).toBeVisible();
      });
    });

    test.describe("User involved in projects is logged in", () => {
      test.use({
        storageState:
          "playwright-tests/storage-states/wallet-connected-project-owner.json",
      });
      test("should see their involved project", async ({ page }) => {
        const projectTitle = await page.getByText(
          "Testing project on Build DAO",
        );
        await expect(projectTitle).toBeVisible({ timeout: 10000 });
      });
    });

    test.describe("User not involved in projects is logged in", () => {
      test.use({
        storageState: "playwright-tests/storage-states/wallet-connected.json",
      });
      test("should see empty screen", async ({ page }) => {
        const noProjectFound = await page.getByText("No Projects Found");
        await expect(noProjectFound).toBeVisible();
      });
    });
  });
});
