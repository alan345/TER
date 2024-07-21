import { expect, test } from "@playwright/test";

test.setTimeout(5000);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
test("go to /", async ({ page }) => {
  await page.goto("/");

  // check for the page
  await page.waitForSelector("img");
  await page.waitForSelector(`text=Trpc Express React`);
  await page.waitForSelector(`text=Loading...`);
  await page.waitForSelector(`text=Login`);
  expect(await page.locator(`text=Loading...`).count()).toEqual(0);
  await page.waitForSelector(`text=ID`);
  await page.waitForSelector(`text=Beers`);
  await page.waitForSelector(`text=Brand`);
  await page.waitForSelector(`text=Name`);
  await page.waitForSelector(`text=Style`);
  expect(await page.locator(`text=Users`).count()).toEqual(0);

  // Login experience
  await page.locator("#login-button").click();
  await page.waitForSelector(`text=Cancel`);
  await page.locator("#login-mutation-button").click();
  await page.waitForSelector(`text=Hey Alan Doe!`);

  // Users page experience when logged in
  await page.waitForSelector(`text=Users`);
  await delay(3000);
  await page.locator(`text=Users`).click();
  await page.waitForSelector(`text=First Name`);

  // Logout experience
  await page.locator("#logout-button").click();
  await page.waitForSelector(`text=Login`);
});

test("Server checks", async ({ page }) => {
  await page.goto("http://localhost:2022/health");
  await page.waitForSelector(`text=message`);
  await page.waitForSelector(`text=ok`);
});
