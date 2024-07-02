import { expect, test } from "@playwright/test";
import { MAINNET_ROOT_SRC } from "../util/constants";

test.describe("?page=activity&tab=proposals", () => {
  test.use({
    baseURL: "http://localhost:8000",
  });

  test.describe("User is not logged in:", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${MAINNET_ROOT_SRC}?page=activity&tab=proposals`);
      await page.waitForTimeout(10000);
    });
    test("'Create Proposal' should be disabled", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Create Proposal" }),
      ).toBeDisabled();
    });

    test("should not be able to vote", async ({ page }) => {
      await expect(
        page.getByText("You are not allowed to vote on this proposal").nth(0),
      ).toBeVisible();
    });

    // TODO Later: we can mock RPC response to get certain proposal and then check comments, voters, etc..
    test("should be able to click 'Comments'", async ({ page }) => {
      await page.getByText("Comments").nth(0).click();
    });

    test("should be able to click 'Votes'", async ({ page }) => {
      await page.getByText("Voters").nth(0).click();
    });

    test("should be able to 'Share'", async ({ page }) => {
      await page.getByText("Share").nth(0).click();
      await expect(page.getByText("Share with friends")).toBeVisible();
      await expect(page.getByRole("button", { name: " Copy" })).toBeVisible();
    });

    test("should be able to click 'More details'", async ({ page }) => {
      await page.getByText("More Details").nth(0).click();
    });
  });

  test.describe("User is logged in", () => {
    test.use({
      storageState:
        "playwright-tests/storage-states/mainnet-wallet-connected.json",
    });

    test.describe("should be able to interact with proposal", () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(
          `/${MAINNET_ROOT_SRC}?page=activity&tab=proposals&proposalId=362`,
        );
        await page.waitForTimeout(10000);
        await expect(
          page.getByText("You are allowed to vote on this proposal").nth(0),
        ).toBeVisible();
      });

      test("should be able to 'Approve'", async ({ page }) => {
        await page.getByTestId("approve-vote").click();
        await expect(page.getByText("Send Notification")).toBeVisible();
        await page.getByRole("button", { name: "No" }).click();
        const expectedTransactionData = {
          id: 362,
          action: "VoteApprove",
        };
        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });

      test("should be able to vote 'Reject'", async ({ page }) => {
        await page.getByTestId("reject-vote").click();
        await expect(page.getByText("Send Notification")).toBeVisible();
        await page.getByRole("button", { name: "No" }).click();
        const expectedTransactionData = {
          id: 362,
          action: "VoteReject",
        };
        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });

      test("should be able to vote 'Spam'", async ({ page }) => {
        await page.getByTestId("spam-vote").click();
        await expect(page.getByText("Send Notification")).toBeVisible();
        await page.getByRole("button", { name: "No" }).click();
        const expectedTransactionData = {
          id: 362,
          action: "VoteRemove",
        };

        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });
    });

    test.describe("should be able to create proposal", () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/${MAINNET_ROOT_SRC}?page=activity&tab=proposals`);
        await page.waitForTimeout(10000);
        await page.getByText("Create Proposal").click();
        await expect(
          page.getByRole("heading", { name: "Create Proposal" }),
        ).toBeVisible();
      });

      test("should create 'Text' proposal", async ({ page }) => {
        await page
          .getByTestId("select-proposal-type")
          .selectOption({ value: "text" });
        const description = await page
          .frameLocator("iframe")
          .locator('textarea[name="textarea"]');
        await description.click();
        await description.fill("This is a test text proposal");
        await page.getByRole("button", { name: "Create" }).click();
       await expect(page.getByText("Awaiting Approval")).toBeVisible()
        await page.getByText("Copy").click();
        const expectedTransactionData = {
          proposal: {
            description: "This is a test text proposal",
            kind: "Vote",
          },
        };
        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });

      test("should create 'Transfer' proposal", async ({ page }) => {
        await page
          .getByTestId("select-proposal-type")
          .selectOption({ value: "transfer" });
        const description = await page
          .frameLocator("iframe")
          .locator('textarea[name="textarea"]');
        await description.click();
        await description.fill("This is a test transfer proposal");
        await page
          .getByTestId("transfer-token-select")
          .selectOption({ value: "NEAR" });
        await page.getByPlaceholder("NEAR Address").fill("megha19.near");
        await page.getByPlaceholder("0").fill("10");
        await page.getByRole("button", { name: "Create" }).click();
        await expect(page.getByText("Awaiting Approval")).toBeVisible()
        await page.getByText("Copy").click();
        const expectedTransactionData = {
          proposal: {
            description: "This is a test transfer proposal",
            kind: {
              Transfer: {
                token_id: "",
                receiver_id: "megha.near",
                amount: "7000000000000000000000000",
              },
            },
          },
        };
        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });
      test("should create 'Function call' proposal", async ({ page }) => {
       await page.waitForSelector("");
      });
      test("should create 'Add member to role' proposal", async ({ page }) => {
        await page.waitForSelector("");
      });

      test("should create 'Remove member to role' proposal", async ({
        page,
      }) => {
        await page.waitForSelector("");
      });
    });
  });
});
