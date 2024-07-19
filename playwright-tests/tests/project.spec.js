import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

const projectId = "meghagoel.testnet/project/testing-project-on-builddao";

test.describe("?page=project&id=", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}?page=project&id=${projectId}`);
  });

  test("should navigate to projects using 'Back to projects'", async ({
    page,
  }) => {
    const backToProjects = await page.getByText("Back to Projects");
    await backToProjects.click();
    expect(page.url()).toContain("?page=projects");
  });
  test("should show Ariz portfolio button when owner of project", async ({ page }) => {
    const arizButton = await page.getByTestId("ariz-portfolio");
    expect(arizButton).toBeInTheDocument();
  });
  test("should navigate to Ariz portfolio when clicked", async ({ page }) => {
    const arizButton = await page.getByTestId("ariz-portfolio");
    await arizButton.click();
    await expect(page).toHaveURL(/https:\/\/arizportfolio\.near\.page\//);
  });

  test.describe("Overview Page", () => {
    test("should display 'Project Details", async ({ page }) => {
      await expect(page.getByText("About")).toBeVisible();
      await expect(page.getByText("Location")).toBeVisible();
      await expect(page.getByText("Team Size")).toBeVisible();
      await expect(page.getByText("Contributors")).toBeVisible();
      await expect(page.getByText("Project Tags")).toBeVisible();
    });
  });
  test.describe("Tasks Page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${ROOT_SRC}?page=project&id=${projectId}&tab=tasks`);
      await page.waitForTimeout(10000);
    });
    test("should display 'Tasks' board", async ({ page }) => {
      await expect(page.getByText("Proposed")).toBeVisible();
      await expect(page.getByText("In Progress")).toBeVisible();
      await expect(page.getByText("Completed")).toBeVisible();
    });

    test("should be able to view a task", async ({ page }) => {
      const taskCard = page.getByText("Playwright test");
      await expect(taskCard).toBeVisible({ timeout: 10000 });
      await taskCard.click();
      await expect(
        page.getByRole("heading", { name: "Task Details" }),
      ).toBeVisible();
      await expect(
        page.getByRole("dialog").getByText("Playwright test"),
      ).toBeVisible();
      await expect(page.getByText("This task is for testing UI")).toBeVisible();
      await expect(page.getByText("P3", { exact: true })).toBeVisible();
      await expect(
        page.getByRole("link", { name: "meghagoel.testnet @meghagoel." }),
      ).toBeVisible();
      await expect(page.getByText("Labels")).toBeVisible();
      await expect(page.getByText("Task List")).toBeVisible();
    });

    test.describe("Contributor is logged in", () => {
      test.use({
        storageState:
          "playwright-tests/storage-states/wallet-connected-project-owner.json",
      });

      test("should be able to add a task", async ({ page }) => {
        const expectedTransactionData = {
          "meghagoel.testnet": {
            task: {
              "task-created-using-playwright": {
                "": '{"title":"Task created using playwright","description":"Description filled using playwright","author":"meghagoel.testnet","tags":["test"],"list":[{"title":"First task detail","isCompleted":false}],"status":"proposed","priority":"P3","assignees":["meghagoel.testnet"],"startDate":"2024-08-19","endDate":"2024-08-20"}',
                metadata: {
                  title: "Task created using playwright",
                  description: "Description filled using playwright",
                  author: "meghagoel.testnet",
                  tags: '["test"]',
                  list: '[{"title":"First task detail","isCompleted":false}]',
                  status: "proposed",
                  priority: "P3",
                  assignees: '["meghagoel.testnet"]',
                  startDate: "2024-08-19",
                  endDate: "2024-08-20",
                },
              },
            },
            "buildhub.testnet": {
              "project-task": {
                "testing-project-on-builddao": {
                  task: {
                    "meghagoel.testnet_task_task-created-using-playwright": "",
                  },
                },
              },
            },
          },
        };
        await page.locator("div > .bi").first().click();
        await expect(
          page.getByRole("heading", { name: "Add Task" }),
        ).toBeVisible();
        await page
          .getByPlaceholder("Enter task title")
          .fill("Task created using playwright");

        await page
          .getByPlaceholder("Enter description")
          .fill("Description filled using playwright");

        await page.getByRole("combobox").first().selectOption("P3");
        await page.getByPlaceholder("Add task assignee").fill("meghagoel");
        await page.getByLabel("meghagoel.testnet").click();

        await page.getByPlaceholder("Add labels").fill("test");
        await page.getByLabel("test").click();
        await page.getByPlaceholder("Enter start date").fill("2024-08-19");
        await page.getByPlaceholder("Enter end date").fill("2024-08-20");
        await page.getByTestId("add-task-item").click();
        await page.getByPlaceholder("Task Detail").fill("First task detail");
        await page.getByRole("button", { name: "Add Task" }).click();
        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });

      test("should be able to clear input of task form", async ({ page }) => {
        await page.locator("div > .bi").first().click();
        await expect(
          page.getByRole("heading", { name: "Add Task" }),
        ).toBeVisible();
        const titleInput = page.getByPlaceholder("Enter task title");
        await titleInput.fill("Task created using playwright");
        const descriptionInput = page.getByPlaceholder("Enter description");
        await descriptionInput.fill("description filled using playwright");
        await page.getByRole("button", { name: "Clear Inputs" }).click();
        await expect(titleInput).toHaveValue("");
        await expect(descriptionInput).toHaveValue("");
      });

      test("should be able to edit a task", async ({ page }) => {
        const expectedTransactionData = {
          "meghagoel.testnet": {
            task: {
              "playwright-test": {
                "": '{"title":"New title","description":"New description","author":"meghagoel.testnet","tags":["test"],"list":[{"title":"Test project view using playwright","isCompleted":false}],"status":"proposed","priority":"P3","assignees":["meghagoel.testnet"],"startDate":"","endDate":""}',
                metadata: {
                  title: "New title",
                  description: "New description",
                  author: "meghagoel.testnet",
                  tags: '["test"]',
                  list: '[{"title":"Test project view using playwright","isCompleted":false}]',
                  status: "proposed",
                  priority: "P3",
                  assignees: '["meghagoel.testnet"]',
                  startDate: "",
                  endDate: "",
                },
              },
            },
            "buildhub.testnet": {
              "project-task": {
                "testing-project-on-builddao": {
                  task: {
                    "meghagoel.testnet_task_playwright-test": "",
                  },
                },
              },
            },
          },
        };
        const dropdownBtn = page.getByTestId("task-dropdown").first();
        await expect(dropdownBtn).toBeVisible({ timeout: 10000 });
        await dropdownBtn.click();
        await page.getByText("Edit Task").click();
        await page.getByPlaceholder("Enter task title").fill("New title");

        await page
          .getByPlaceholder("Enter description")
          .fill("New description");
        await page.getByRole("button", { name: "Save" }).click();
        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });

      test("should be able to delete a task", async ({ page }) => {
        const expectedTransactionData = {
          "meghagoel.testnet": {
            task: {
              "playwright-test": null,
            },
            "buildhub.testnet": {
              "project-task": {
                "testing-project-on-builddao": {
                  task: {
                    "meghagoel.testnet_task_playwright-test": null,
                  },
                },
              },
            },
          },
        };
        const dropdownBtn = page.getByTestId("task-dropdown").first();
        await expect(dropdownBtn).toBeVisible({ timeout: 10000 });
        await dropdownBtn.click();
        await page.getByText("Delete Task").click();
        await expect(
          page.getByText("Are you sure you want to delete the task ?"),
        ).toBeVisible();
        await page.getByRole("button", { name: "Delete" }).click();
        const transactionObj = JSON.parse(
          await page.locator("div.modal-body code").innerText(),
        );
        expect(transactionObj).toMatchObject(expectedTransactionData);
      });
    });
  });
});

test.describe("Feed Pages", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });

  const pages = [
    {
      name: "Activity",
      tab: "activity",
      expectedText: "Testing Project On Build DAO",
    },
    {
      name: "Updates",
      tab: "updatesFeed",
      expectedText: "Testing Project On Build DAO Updates",
    },
    {
      name: "Feedback",
      tab: "feedbackFeed",
      expectedText: "Testing Project On Build DAO Feedback",
    },
  ];

  pages.forEach(({ name, tab, expectedText }) => {
    test.describe(`${name} Feed`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/${ROOT_SRC}?page=project&id=${projectId}&tab=${tab}`);
      });

      test(`should display feed and post option`, async ({ page }) => {
        await expect(async () => {
          const element = await page.getByText(expectedText);
          await expect(element).toBeVisible();
        }).toPass();

        await expect(async () => {
          const postButton = await page.getByRole("button", { name: "Post" });
          await expect(postButton).toBeVisible();
        }).toPass();
      });
    });
  });
});
