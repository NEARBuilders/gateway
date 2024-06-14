import { test, expect } from "@playwright/test";
import { ROOT_SRC } from "../util/constants";

test.beforeEach(async ({ page }) => {
  await page.goto(`/${ROOT_SRC}?page=projects`);
});

// (this may be changed to open preview modal rather than page)
test("should navigate to project page on grid card click", async ({ page }) => {
  // select grid layout
  await page.getByTestId("grid-layout-button").click();

  // click grid card
  const projectGridCard = await page.getByTestId("project-grid-card").nth(1);

  await expect(projectGridCard).toBeVisible({ timeout: 10000 });

  await Promise.all([projectGridCard.click(), page.waitForLoadState("load")]);

  expect(page.url()).toContain("?page=project&id=");
});

// (this may be changed to open preview modal rather than page)
test("should navigate to project page on list card click", async ({ page }) => {
  // select list layout
  await page.getByTestId("list-layout-button").click();

  // click list card
  const projectListCard = await page.getByTestId("project-list-card").nth(1);

  await expect(projectListCard).toBeVisible({ timeout: 10000 });

  await Promise.all([projectListCard.click(), page.waitForLoadState("load")]);

  expect(page.url()).toContain("?page=project&id=");
});
