import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";
import { MOCK_RPC_URL, mockRpcRequest } from "../util/rpcmock";
test.describe("Potlock import tests", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}?page=projects`);
    await page.waitForTimeout(5000);
  });
  test("Import project", async ({ page }) => {
    const allProjectsBtn = await page.getByRole("button", {
      name: "All Projects",
    });
    await allProjectsBtn.click();
    const createProjectBtn = await page.getByRole("button", {
      name: "Create Project",
    });
    await createProjectBtn.click();
    await page.route("**rpc.mainnet.near.org*", (route) => {
      console.log("Im logging the request");
      route.continue();
    });
    const importProject = await page.getByText("Import from Potlock");
    await importProject.click();
    await page.waitForTimeout(5000);

    const mockedResult = {
      name: "Potlock Project",
      description: "Mocked response for Potlock project import",
      data: [10, 20, 30],
    };

    await mockRpcRequest({
      page,
      filterParams: {
        method_name: "get",
      },
      mockedResult: mockedResult,
      modifyOriginalResultFunction: async (originalResult) => {
        return originalResult;
      },
    });
  });
});
