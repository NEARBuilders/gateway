import { expect, test } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

const clickAndAssertTab = async (page, tabName, urlFragment, textToAssert) => {
  await page.getByRole("button", { name: tabName }).click();
  expect(page.url()).toContain(urlFragment);
  await page.waitForTimeout(1000);
  if (textToAssert) {
    expect(page.getByText(textToAssert, { exact: true })).toBeVisible();
  }
};

test.describe("All tabs must be visible and redirected to respective pages", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}?page=activity`);
    await page.waitForTimeout(5000); // Wait for page to load completely
  });

  test("All Feed", async ({ page }) => {
    await clickAndAssertTab(page, "All", "?page=activity&tab=all", "All Feed");
  });

  test("Updates", async ({ page }) => {
    await clickAndAssertTab(
      page,
      "Updates",
      "?page=activity&tab=updates",
      "Updates Feed",
    );
  });

  test("Question", async ({ page }) => {
    await clickAndAssertTab(
      page,
      "Question",
      "?page=activity&tab=question",
      "Question Feed",
    );
  });

  test("Idea", async ({ page }) => {
    await clickAndAssertTab(
      page,
      "Idea",
      "?page=activity&tab=idea",
      "Idea Feed",
    );
  });

  test("Feedback", async ({ page }) => {
    await clickAndAssertTab(
      page,
      "Feedback",
      "?page=activity&tab=feedback",
      "Feedback Feed",
    );
  });

  test("Events", async ({ page }) => {
    await clickAndAssertTab(
      page,
      "Events",
      "?page=activity&tab=events",
      "Month",
    );
  });

  test("Bookmarks", async ({ page }) => {
    await clickAndAssertTab(page, "Bookmarks", "?page=activity&tab=bookmarks");
    const bookmarksHeading = page.locator('h2:has-text("Bookmarks")');
    await expect(bookmarksHeading).toBeVisible();
  });

  test("Request", async ({ page }) => {
    await clickAndAssertTab(
      page,
      "Request",
      "?page=activity&tab=request",
      "Request Feed",
    );
  });

  test("Proposals", async ({ page }) => {
    await clickAndAssertTab(page, "Proposals", "?page=activity&tab=proposals");
  });
});
test.describe("User is logged in", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`/${ROOT_SRC}?page=activity`);
    await page.waitForTimeout(5000); // Wait for page to load completely
  });

  test("Post an Update", async ({ page }) => {
    await page.getByRole("button", { name: "Updates" }).click();
    await page.waitForTimeout(5000);

    const postUpdate = await page.frameLocator("iframe").first();
    await postUpdate
      .locator('textarea[name="textarea"]')
      .fill("Post a test update");

    const expectedTransactionData = {
      "saswat_test.testnet": {
        post: {
          main: '{"type":"md","text":"Post a test update\\n\\n #build #update"}',
        },
        index: {
          post: '{"key":"main","value":{"type":"md"}}',
          hashtag:
            '[{"key":"build","value":{"type":"social","path":"saswat_test.testnet/post/main"}},{"key":"update","value":{"type":"social","path":"saswat_test.testnet/post/main"}}]',
        },
      },
    };

    const postButton = await page.getByRole("button", { name: "Post" });
    await postButton.click();
    await page.waitForTimeout(3000);

    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });
  test("Post an Question", async ({ page }) => {
    await page.getByRole("button", { name: "Question" }).click();
    await page.waitForTimeout(5000);

    const postQuestion = await page.frameLocator("iframe").first();
    await postQuestion
      .locator('textarea[name="textarea"]')
      .fill("Post a test question");
    const expectedTransactionData = {
      "saswat_test.testnet": {
        post: {
          main: '{"type":"md","text":"Post a test question\\n\\n #build #question"}',
        },
        index: {
          post: '{"key":"main","value":{"type":"md"}}',
          hashtag:
            '[{"key":"build","value":{"type":"social","path":"saswat_test.testnet/post/main"}},{"key":"question","value":{"type":"social","path":"saswat_test.testnet/post/main"}}]',
        },
      },
    };

    const postButton = await page.getByRole("button", { name: "Post" });
    await postButton.click();
    await page.waitForTimeout(3000);

    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });
  test("Post an Idea", async ({ page }) => {
    await page.getByRole("button", { name: "Idea" }).click();
    await page.waitForTimeout(5000);

    const postIdea = await page.frameLocator("iframe").first();
    await postIdea
      .locator('textarea[name="textarea"]')
      .fill("Post a test idea");

    const expectedTransactionData = {
      "saswat_test.testnet": {
        post: {
          main: '{"type":"md","text":"Post a test idea\\n\\n #build #idea"}',
        },
        index: {
          post: '{"key":"main","value":{"type":"md"}}',
          hashtag:
            '[{"key":"build","value":{"type":"social","path":"saswat_test.testnet/post/main"}},{"key":"idea","value":{"type":"social","path":"saswat_test.testnet/post/main"}}]',
        },
      },
    };

    const postButton = await page.getByRole("button", { name: "Post" });
    await postButton.click();
    await page.waitForTimeout(3000);

    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });
  test("Post a Feedback", async ({ page }) => {
    await page.getByRole("button", { name: "Feedback" }).click();
    await page.waitForTimeout(5000);

    const postFeedback = await page.frameLocator("iframe").first();
    await postFeedback
      .locator('textarea[name="textarea"]')
      .fill("Post a test feedback");

    const expectedTransactionData = {
      "saswat_test.testnet": {
        post: {
          main: '{"type":"md","text":"Post a test feedback\\n\\n #build #feedback"}',
        },
        index: {
          post: '{"key":"main","value":{"type":"md"}}',
          hashtag:
            '[{"key":"build","value":{"type":"social","path":"saswat_test.testnet/post/main"}},{"key":"feedback","value":{"type":"social","path":"saswat_test.testnet/post/main"}}]',
        },
      },
    };

    const postButton = await page.getByRole("button", { name: "Post" });
    await postButton.click();
    await page.waitForTimeout(3000);

    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });
  test("Post a Request", async ({ page }) => {
    await page.getByRole("button", { name: "Request" }).click();
    await page.waitForTimeout(5000);

    const postRequest = await page.frameLocator("iframe").first();
    await postRequest
      .locator('textarea[name="textarea"]')
      .fill("Post a test request");

    const expectedTransactionData = {
      "saswat_test.testnet": {
        post: {
          main: '{"type":"md","text":"Post a test request\\n\\n #build #request"}',
        },
        index: {
          post: '{"key":"main","value":{"type":"md"}}',
          hashtag:
            '[{"key":"build","value":{"type":"social","path":"saswat_test.testnet/post/main"}},{"key":"request","value":{"type":"social","path":"saswat_test.testnet/post/main"}}]',
        },
      },
    };

    const postButton = await page.getByRole("button", { name: "Post" });
    await postButton.click();
    await page.waitForTimeout(3000);

    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });

  test("Create an event", async ({ page }) => {
    await clickAndAssertTab(
      page,
      "Events",
      "?page=activity&tab=events",
      "Month",
    );
    const addEventBtn = await page.getByRole("button", { name: "Add Event" });
    await addEventBtn.click();
    await page.waitForTimeout(1000);
    const dialog = page.locator('div[role="dialog"]');
    await expect(dialog).toBeVisible();

    const titleInput = page.getByPlaceholder("Enter event name");
    await titleInput.fill("Test event");

    const descriptionIframe = dialog.locator("iframe.w-100.h-100");
    const frame = await descriptionIframe.contentFrame();
    const textAreaSelector = ".rc-md-editor .editor-container .sec-md .input";
    const textArea = frame.locator(textAreaSelector);
    await textArea.fill("Event Description");

    const rbtInputMulti = dialog.locator(".rbt-token-label");
    await expect(rbtInputMulti).toBeVisible();

    await expect(rbtInputMulti).toHaveText("saswat_test.testnet");

    const eventLinkInput = page.getByPlaceholder("Enter link");
    await eventLinkInput.fill("google-meet.xyz");
    const locationInput = page.getByPlaceholder("Enter location");
    await locationInput.fill("India");

    const submitButton = dialog.locator('button:has-text("Submit")');
    await expect(submitButton).not.toBeDisabled();
    await submitButton.click();
    await page.waitForTimeout(1000);

    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    const dynamicEventId = Object.keys(
      transactionObj["saswat_test.testnet"].every.event,
    )[0];

    const actualEventData =
      transactionObj["saswat_test.testnet"].every.event[dynamicEventId];
    const expectedMetadata = {
      name: "Test event",
      description: "Event Description",
      image: {},
      backgroundImage: {},
      type: "buildhub.testnet/type/event",
    };

    expect(actualEventData.metadata).toMatchObject(expectedMetadata);

    const eventDataString = actualEventData[""];
    expect(eventDataString).toContain('"title":"Test event"');
    expect(eventDataString).toContain('"description":"Event Description"');
    expect(eventDataString).toContain('"url":"google-meet.xyz"');
    expect(eventDataString).toContain(
      '"extendedProps":{"organizers":["saswat_test.testnet"],"location":"India","hashtags":[],"cover":{}}',
    );

    const eventData = JSON.parse(eventDataString);
    expect(eventData).toMatchObject({
      title: "Test event",
      description: "Event Description",
      url: "google-meet.xyz",
      extendedProps: {
        organizers: ["saswat_test.testnet"],
        location: "India",
        hashtags: [],
        cover: {},
      },
    });
  });

  test("Edit a post and Save", async ({ page }) => {
    await clickAndAssertTab(page, "All", "?page=activity&tab=all", "All Feed");
    await page.waitForTimeout(1000);
    const dropdown = page.locator(".bi.bi-three-dots-vertical").nth(1);
    await dropdown.click();
    const editPost = page.getByText("Edit Post");
    await editPost.click();
    await page.waitForTimeout(1000);
    const postEdit = await page.frameLocator("iframe").nth(1);
    await postEdit.locator('textarea[name="textarea"]').fill("Edit Post");
    const editPostBtn = await page.getByRole("button", { name: "Edit Post" });
    await editPostBtn.click();
    await page.waitForTimeout(1000);
    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    const expectedTransactionData = {
      "saswat_test.testnet": {
        index: {
          modify:
            '{"key":{"type":"social","path":"saswat_test.testnet/post/main","blockHeight":163697208},"value":{"type":"edit","value":{"text":"Edit Post"}}}',
        },
      },
    };
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });

  test("Bookmark a Post", async ({ page }) => {
    await clickAndAssertTab(page, "All", "?page=activity&tab=all", "All Feed");
    await page.waitForTimeout(1000);
    const bookmarkIcon = await page.getByTitle("Bookmark").nth(1);
    await bookmarkIcon.click();
    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    const expectedTransactionData = {
      "saswat_test.testnet": {
        index: {
          bookmark:
            '{"key":{"type":"social","path":"saswat_test.testnet/post/main","blockHeight":163697208},"value":{"type":"bookmark"}}',
        },
        graph: {
          bookmark: {
            "saswat_test.testnet": {
              post: {
                main: {
                  163697208: "",
                },
              },
            },
          },
        },
      },
    };
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });
  test("Like a Post", async ({ page }) => {
    await clickAndAssertTab(page, "All", "?page=activity&tab=all", "All Feed");
    await page.waitForTimeout(1000);
    const likeIcon = await page.getByTitle("Like").nth(1);
    await page.waitForTimeout(1000);
    await likeIcon.click();
    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    const expectedTransactionData = {
      "saswat_test.testnet": {
        index: {
          like: '{"key":{"type":"social","path":"saswat_test.testnet/post/main","blockHeight":163697208},"value":{"type":"like"}}',
          notify:
            '{"key":"saswat_test.testnet","value":{"type":"like","item":{"type":"social","path":"saswat_test.testnet/post/main","blockHeight":163697208}}}',
        },
      },
    };
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });
  test("Repost a Post", async ({ page }) => {
    await clickAndAssertTab(page, "All", "?page=activity&tab=all", "All Feed");
    await page.waitForTimeout(1000);
    const repostIcon = await page.getByTitle("Repost").nth(1);
    await page.waitForTimeout(1000);
    await repostIcon.click();
    const dropdownItems = await page.getByRole("button", { name: "Repost" });

    await dropdownItems.click();

    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    const expectedTransactionData = {
      "saswat_test.testnet": {
        index: {
          repost:
            '[{"key":"main","value":{"type":"repost","item":{"type":"social","path":"itexpert120.testnet/post/main","blockHeight":166879727}}},{"key":{"type":"social","path":"itexpert120.testnet/post/main","blockHeight":166879727},"value":{"type":"repost"}}]',
          notify:
            '{"key":"itexpert120.testnet","value":{"type":"repost","item":{"type":"social","path":"itexpert120.testnet/post/main","blockHeight":166879727}}}',
        },
      },
    };
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });

  test("Comment on a post", async ({ page }) => {
    await clickAndAssertTab(page, "All", "?page=activity&tab=all", "All Feed");
    await page.waitForTimeout(1000);
    const commentIcon = await page.getByTitle("Comment").nth(1);
    await page.waitForTimeout(1000);
    await commentIcon.click();
    const commentPost = await page.frameLocator("iframe").nth(1);
    await commentPost.locator('textarea[name="textarea"]').fill("test comment");
    const CommentBtn = await page.getByRole("button", { name: "Comment" });
    await CommentBtn.click();
    const saveDataButton = await page
      .getByRole("button", { name: "Save Data" })
      .nth(0);
    await saveDataButton.click();

    const transactionObj = JSON.parse(
      await page.locator("div.modal-body code").innerText(),
    );
    const expectedTransactionData = {
      "saswat_test.testnet": {
        post: {
          comment:
            '{"item":{"type":"social","path":"saswat_test.testnet/post/main","blockHeight":163697208},"type":"md","text":"test comment"}',
        },
        index: {
          comment:
            '{"key":{"type":"social","path":"saswat_test.testnet/post/main","blockHeight":163697208},"value":{"type":"md"}}',
        },
      },
    };
    expect(transactionObj).toMatchObject(expectedTransactionData);
  });
  test("Convert post into proposal", async ({ page }) => {
    await clickAndAssertTab(page, "All", "?page=activity&tab=all", "All Feed");
    await page.waitForTimeout(1000);
    const dropdown = page.locator(".bi.bi-three-dots-vertical").nth(1);
    await dropdown.click();
    await page.waitForTimeout(1000);
    const convertPost = page.getByText("Propose");
    await convertPost.click();
    await page.waitForTimeout(1000);
    const DAOContractID = await page.getByText("build.sputnik-dao.near");
    await expect(DAOContractID).toBeVisible();
  });
});
