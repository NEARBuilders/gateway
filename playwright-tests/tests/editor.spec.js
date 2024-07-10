import { expect, test } from "@playwright/test";
import path from "path";
import { ROOT_SRC } from "../util/constants";

test.describe("?page=projects&tab=editor", () => {
  test.describe("Editor", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=projects&tab=editor`);
    });

    test.describe("User is not logged in", () => {
      test.use({
        storageState:
          "playwright-tests/storage-states/wallet-not-connected.json",
      });

      test("editor page should prompt user to log in", async ({ page }) => {
        const requireLogin = await page.getByText(
          "Please log in in order to see create or edit a project.",
        );

        await expect(requireLogin).toBeVisible();
      });
    });

    test.describe("User is logged in", () => {
      test.use({
        storageState: "playwright-tests/storage-states/wallet-connected.json",
      });

      test("should not allow next when empty required fields", async ({
        page,
      }) => {
        const nextButton = await page.getByRole("button", { name: "Next" });
        await expect(nextButton).toBeDisabled();

        const projectAccountAddress = await page.getByPlaceholder(
          "Enter Project Account Address",
        );

        const title = await page.getByPlaceholder("Enter Project Title");
        const description = await page
          .frameLocator("iframe")
          .locator('textarea[name="textarea"]');

        // Fill required fields
        await projectAccountAddress.fill("anyproject.near");
        await title.fill("Sample project");

        await description.click();
        await description.fill("This is a sample project");

        await expect(nextButton).toBeEnabled();

        // Clear title
        await title.clear();
        await expect(nextButton).toBeDisabled();

        await title.fill("Sample project");
        await expect(nextButton).toBeEnabled();

        await description.click();
        await description.clear();
        await expect(nextButton).toBeDisabled();
      });

      test("should not allow invalid project account address", async ({
        page,
      }) => {
        // Project Account Address
        await page
          .getByPlaceholder("Enter Project Account Address")
          .fill("anyproject");

        const errorMsg = await page.getByText(
          "Invalid Near Address, please enter a valid near address",
        );
        await expect(errorMsg).toBeVisible();
      });

      test("cancel should navigate to main projects page", async ({ page }) => {
        await page.getByRole("button", { name: "Cancel" }).click();
        expect(page.url()).toContain("?page=projects");
      });

      test("should complete flow and save data correctly with images populated", async ({
        page,
      }) => {
        const expectedProjectData = {
          title: "Sample project",
          description: "This is a sample project",
          profileImage: {
            ipfs_cid: "simple_cid_1",
          },
          backgroundImage: {
            ipfs_cid: "simple_cid_2",
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
          contributors: ["saswat_test.testnet", "nobody.testnet"],
          tabs: ["overview", "tasks", "activity"],
          projectAccountId: "anyproject.near",
          teamSize: "1-10",
          location: "anywhere",
        };

        const expectedTransactionData = {
          "saswat_test.testnet": {
            project: {
              "sample-project": {
                "": JSON.stringify(expectedProjectData),
                metadata: {
                  name: "Sample project",
                  description: "This is a sample project",
                  image: {
                    ipfs_cid: "simple_cid_1",
                  },
                  backgroundImage: {
                    ipfs_cid: "simple_cid_2",
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
                "saswat_test.testnet_project_sample-project": "",
              },
            },
          },
        };

        // Page one //

        // Project Account Address
        await page
          .getByPlaceholder("Enter Project Account Address")
          .fill("anyproject.near");

        // Title
        await page
          .getByPlaceholder("Enter Project Title")
          .fill("Sample project");

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
        await page.getByRole("combobox").nth(0).fill("nobody.testnet");
        await page.getByLabel("nobody.testnet").click();

        await page.route("**/add", async (route) => {
          const modifiedResponse = {
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ cid: "simple_cid_1" }),
          };

          // Fulfill the route with the modified response
          await route.fulfill(modifiedResponse);
        });

        await page.route("**/add", async (route) => {
          const modifiedResponse = {
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ cid: "simple_cid_1" }),
          };

          // Fulfill the route with the modified response
          await route.fulfill(modifiedResponse);
        });

        // Avatar
        const avatarInput = await page.locator("input[type=file]").nth(0);
        await avatarInput.setInputFiles(
          path.join(__dirname, "./assets/black.png"),
        );

        await expect(
          await page.getByRole("img", { name: "Image Preview" }).nth(0),
        ).toBeVisible();

        await page.route("**/add", async (route) => {
          const modifiedResponse = {
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ cid: "simple_cid_2" }),
          };

          // Fulfill the route with the modified response
          await route.fulfill(modifiedResponse);
        });

        // Background
        const backgroundInput = await page.locator("input[type=file]").nth(1);
        await backgroundInput.setInputFiles(
          path.join(__dirname, "./assets/black.png"),
        );

        await expect(
          await page.getByRole("img", { name: "Image Preview" }).nth(1),
        ).toBeVisible();

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

  test.describe("Import project from Potlock", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=projects&tab=potlockImport`);
    });
    test.use({
      storageState: "playwright-tests/storage-states/wallet-connected.json",
    });

    test("should have warning text on testnet", async ({ page }) => {
      const warningText = page.getByText(
        "Network issue: Couldn't fetch any projects, please try again later",
      );
      await expect(warningText).toBeVisible();
    });
  });

  test.describe("Import project from NEAR Catalog", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=projects&tab=catalogImport`);
    });

    test.use({
      storageState: "playwright-tests/storage-states/wallet-connected.json",
    });

    // should have visible projects
    test("should have visible projects", async ({ page }) => {
      const projectHeading = await page.getByRole("heading", {
        name: "Race of Sloths",
      });
      await expect(projectHeading).toBeVisible();
    });

    test("Should be able to create a new project from NEAR Catalog", async ({
      page,
    }) => {
      const projectHeading = page.getByRole("heading", {
        name: "Race of Sloths",
      });
      await expect(projectHeading).toBeVisible({ timeout: 60000 });

      const parentDiv = page
        .locator("div.project-card")
        .filter({ has: projectHeading });
      await expect(parentDiv).toBeVisible({ timeout: 60000 });
      await parentDiv.dispatchEvent("click");

      const nextButton = await page.getByRole("button", { name: "Next" });
      await expect(nextButton).toBeVisible({ timeout: 60000 });
      await nextButton.click();

      const createButton = page.getByRole("button", { name: "Create" });
      await expect(createButton).toBeVisible({ timeout: 60000 });
      await createButton.click();

      const expectedTransactionData = {
        "saswat_test.testnet": {
          project: {
            "race-of-sloths": {
              "": '{"title":"Race of Sloths","description":"# Our mission\\r\\nWe\'re developers aiming to make open-source fun and rewarding.\\r\\n\\r\\nOpen-source drives global innovation, and we want more people to join in. With many open issues in open-source projects, why not make it enjoyable to solve them?\\r\\n\\r\\nJoin the Sloths community to earn Sloth Points in weekly quests while contributing to open-source.\\r\\n\\r\\nThe Race of Sloths originated from NEAR ecosystem, so we want to begin the race with the projects that helped to build NEAR and expand it from there.\\r\\n\\r\\n# How it works\\r\\n\\r\\n**1. Tag the Bot**\\r\\n\\r\\nContributor mentions @race-of-sloths in their pull request on GitHub to join the Race\\r\\n\\r\\n![1. Tag the Bot](https://race-of-sloths.com/images/bot1.svg)\\r\\n\\r\\n**2. Bot Responds**\\r\\n\\r\\nThe pull request is now a part of the Race\\r\\n\\r\\n![2. Bot Responds](https://race-of-sloths.com/images/bot2.svg)\\r\\n\\r\\n\\r\\n**3. Maintainer Scores**\\r\\n\\r\\nRepository maintainer scores the pull request using a Fibonacci scale [0, 1, 2, 3, 5, 8, 13]\\r\\n\\r\\n![3. Maintainer Scores](https://race-of-sloths.com/images/bot3.svg)\\r\\n\\r\\n**4. Leaderboard Updates**\\r\\n\\r\\nAfter 24 hours from the merge, the bot finalizes the score and updates the leaderboard\\r\\n\\r\\n![4. Leaderboard Updates](https://race-of-sloths.com/images/bot4.svg)\\r\\n\\r\\n# Earn Sloth Points  &  Recognition\\r\\n\\r\\n![rating 00](https://race-of-sloths.com/images/rating1.svg)\\r\\n\\r\\n**Valuable Contribution**\\r\\n\\r\\nEarn +10 Sloth points for each score point by submitting valuable pull requests.\\r\\n\\r\\n![rating 01](https://race-of-sloths.com/images/rating2.svg)\\r\\n\\r\\n**Weekly streak**\\r\\n\\r\\nMake at least one contribution each week and earn a bonus on top of your Sloth Points. Consistency is a key!\\r\\n\\r\\n![rating 10](https://race-of-sloths.com/images/rating3.svg)\\r\\n\\r\\n**Monthly streak**\\r\\n\\r\\nKeep your monthly streak of high-valuable pull requests scored 8 or 13 to receive additional bonus at the end of the month.\\r\\n\\r\\n![rating 11](https://race-of-sloths.com/images/rating4.svg)\\r\\n\\r\\n**Lifetime bonus**\\r\\n\\r\\nKeep rocking with your streaks to receive a lifetime bonus to your Sloth points.\\r\\n\\r\\n\\r\\n# Have Fun  &  Contribute\\r\\n\\r\\n### [🦥 Pick a Project](https://race-of-sloths.com/projects)","profileImage":{"url":"https://nearcatalog.xyz/wp-content/uploads/nearcatalog/race-of-sloths.jpg"},"backgroundImage":"","tags":{"developer-support":"","ecosystem":""},"linktree":{"twitter":"race_of_sloths","github":"race-of-sloths","telegram":"race_of_sloths","website":"https://race-of-sloths.com/"},"contributors":["saswat_test.testnet"],"tabs":["overview","tasks","activity","updatesfeed","feedbackfeed"],"projectAccountId":"saswat_test.testnet","teamSize":"","location":""}',
              metadata: {
                name: "Race of Sloths",
                description:
                  "# Our mission\r\nWe're developers aiming to make open-source fun and rewarding.\r\n\r\nOpen-source drives global innovation, and we want more people to join in. With many open issues in open-source projects, why not make it enjoyable to solve them?\r\n\r\nJoin the Sloths community to earn Sloth Points in weekly quests while contributing to open-source.\r\n\r\nThe Race of Sloths originated from NEAR ecosystem, so we want to begin the race with the projects that helped to build NEAR and expand it from there.\r\n\r\n# How it works\r\n\r\n**1. Tag the Bot**\r\n\r\nContributor mentions @race-of-sloths in their pull request on GitHub to join the Race\r\n\r\n![1. Tag the Bot](https://race-of-sloths.com/images/bot1.svg)\r\n\r\n**2. Bot Responds**\r\n\r\nThe pull request is now a part of the Race\r\n\r\n![2. Bot Responds](https://race-of-sloths.com/images/bot2.svg)\r\n\r\n\r\n**3. Maintainer Scores**\r\n\r\nRepository maintainer scores the pull request using a Fibonacci scale [0, 1, 2, 3, 5, 8, 13]\r\n\r\n![3. Maintainer Scores](https://race-of-sloths.com/images/bot3.svg)\r\n\r\n**4. Leaderboard Updates**\r\n\r\nAfter 24 hours from the merge, the bot finalizes the score and updates the leaderboard\r\n\r\n![4. Leaderboard Updates](https://race-of-sloths.com/images/bot4.svg)\r\n\r\n# Earn Sloth Points  &  Recognition\r\n\r\n![rating 00](https://race-of-sloths.com/images/rating1.svg)\r\n\r\n**Valuable Contribution**\r\n\r\nEarn +10 Sloth points for each score point by submitting valuable pull requests.\r\n\r\n![rating 01](https://race-of-sloths.com/images/rating2.svg)\r\n\r\n**Weekly streak**\r\n\r\nMake at least one contribution each week and earn a bonus on top of your Sloth Points. Consistency is a key!\r\n\r\n![rating 10](https://race-of-sloths.com/images/rating3.svg)\r\n\r\n**Monthly streak**\r\n\r\nKeep your monthly streak of high-valuable pull requests scored 8 or 13 to receive additional bonus at the end of the month.\r\n\r\n![rating 11](https://race-of-sloths.com/images/rating4.svg)\r\n\r\n**Lifetime bonus**\r\n\r\nKeep rocking with your streaks to receive a lifetime bonus to your Sloth points.\r\n\r\n\r\n# Have Fun  &  Contribute\r\n\r\n### [🦥 Pick a Project](https://race-of-sloths.com/projects)",
                image: {
                  url: "https://nearcatalog.xyz/wp-content/uploads/nearcatalog/race-of-sloths.jpg",
                },
                backgroundImage: "",
                tags: {
                  "developer-support": "",
                  ecosystem: "",
                },
                linktree: {
                  twitter: "https://twitter.com/race_of_sloths",
                  github: "https://github.com/race-of-sloths",
                  telegram: "https://t.me/race_of_sloths",
                  website: "https://race-of-sloths.com/",
                },
              },
            },
          },
          "builddao.testnet": {
            project: {
              "saswat_test.testnet_project_race-of-sloths": "",
            },
          },
        },
      };

      const transactionObj = JSON.parse(
        await page.locator("div.modal-body code").innerText(),
      );
      // do something with transactionObj
      expect(transactionObj).toMatchObject(expectedTransactionData);
    });
  });
});
