import { test, expect } from "@playwright/test";
import { TESTNET_ROOT_SRC } from "../util/constants";

test("should find bos loader configuration in localstorage", async ({
  page,
}) => {
  await page.goto("/");

  const localStoreFlags = await page.evaluate(() =>
    localStorage.getItem("flags"),
  );
  expect(localStoreFlags).toEqual(
    JSON.stringify({ bosLoaderUrl: "http://127.0.0.1:8080/api/loader" }),
  );
});

test("should not get bos loader fetch error", async ({ page }) => {
  await page.goto(`/${TESTNET_ROOT_SRC}`);
  const bodyText = await page.textContent("body");
  expect(bodyText).not.toContain(
    `Source code for "${TESTNET_ROOT_SRC}" is not found`,
  );
});
