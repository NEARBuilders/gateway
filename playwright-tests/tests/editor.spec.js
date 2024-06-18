import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";
import path from "path";

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

    test.beforeEach(async ({ page }) => {
      // Intercept IPFS requests
      await page.route("**/add", async (route) => {
        const modifiedResponse = {
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ cid: "simple_cid" }),
        };

        // Fulfill the route with the modified response
        await route.fulfill(modifiedResponse);
      });
    });

    test("should not allow next when empty required fields", async ({
      page,
    }) => {
      // title
      // description
    });

    test("next should navigate to next editor page", async ({ page }) => {});

    test("back should navigate to first editor page", async ({ page }) => {});

    test("cancel should navigate to main projects page", async ({
      page,
    }) => {});

    test("should complete flow and save data correctly with images populated", async ({
      page,
    }) => {
      const expectedProjectData = {
        // TODO: We will want to get rid of this
        title: "Sample project",
        description: "This is a sample project",
        profileImage: {
          ipfs_cid: "simple_cid",
        },
        backgroundImage: {
          ipfs_cid: "simple_cid",
        },
        tags: {
          test: "",
        },
        linktree: {
          twitter: "SampleTwitter",
          github: "SampleGithub",
          telegram: "SampleTelegram",
          website: "https://www.samplewebsite.com",
        },
        // End remove
        contributors: ["anybody.near", "nobody.near"],
        tabs: ["overview", "tasks", "activity"],
        projectAccountId: "anyproject.near",
        teamSize: "1-10",
        location: "anywhere",
      };

      const expectedTransactionData = {
        "anybody.near": {
          project: {
            "sample-project": {
              "": JSON.stringify(expectedProjectData),
              metadata: {
                name: "Sample project",
                description: "This is a sample project",
                image: {
                  ipfs_cid: "simple_cid",
                },
                backgroundImage: {
                  ipfs_cid: "simple_cid",
                },
                tags: {
                  test: "",
                },
                linktree: {
                  github: "https://github.com/SampleGithub",
                  telegram: "https://t.me/SampleTelegram",
                  twitter: "https://twitter.com/SampleTwitter",
                  website: "https://www.samplewebsite.com",
                },
              },
            },
          },
          "builddao.testnet": {
            project: {
              "anybody.near_project_sample-project": "",
            },
          },
        },
      };

      // Page one //

      // Title
      await page
        .getByPlaceholder("Enter Project Account Address")
        .fill("anyproject.near");
      await page.getByPlaceholder("Enter Project Title").fill("Sample project");

      // Description
      await page
        .frameLocator("iframe")
        .locator('textarea[name="textarea"]')
        .click();
      await page
        .frameLocator("iframe")
        .locator('textarea[name="textarea"]')
        .fill("This is a sample project");

      await page.getByPlaceholder("Enter location").fill("anywhere"); // Location

      await page.getByRole("combobox").selectOption("1-10");

      await page.getByLabel("Twitter").fill("SampleTwitter");
      await page.getByLabel("Github").fill("SampleGithub");
      await page.getByLabel("Telegram").fill("SampleTelegram");
      await page.getByLabel("Website").fill("https://www.samplewebsite.com");

      // Next page
      await page.getByRole("button", { name: "Next" }).click();

      // Page two //

      // Contributors
      await page.getByRole("combobox").nth(0).click();
      await page.getByRole("combobox").nth(0).fill("nobody.near");
      await page.getByLabel("nobody.near").click();

      // Avatar
      const avatarInput = await page.locator("input[type=file]").nth(0);
      await avatarInput.setInputFiles(
        path.join(__dirname, "./assets/black.png"),
      );

      // Background
      const backgroundInput = await page.locator("input[type=file]").nth(1);
      await backgroundInput.setInputFiles(
        path.join(__dirname, "./assets/black.png"),
      );

      await page.getByLabel("Updates Feed").uncheck();
      await page.getByLabel("Feedback Feed").uncheck();

      await page.getByRole("combobox").nth(1).click();
      await page.getByRole("combobox").nth(1).fill("test");
      await page.getByLabel("test").click();

      await page.getByRole("button", { name: "Create" }).click();
      await page.getByRole("dialog").getByLabel("Close").click();

      // click button that triggers transaction
      await page.getByRole("button", { name: "Create" }).nth(0).click();
      const transactionObj = JSON.parse(
        await page.locator("div.modal-body code").innerText(),
      );
      // do something with transactionObj
      expect(transactionObj).toMatchObject(expectedTransactionData);
    });
  });
});
