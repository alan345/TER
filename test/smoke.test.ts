import { test } from "@playwright/test";

test.setTimeout(5000);

test("go to /", async ({ page }) => {
  await page.goto("/");

  // check for the page
  await page.waitForSelector("img");
  await page.waitForSelector(`text=Trpc Express React`);
  await page.waitForSelector(`text=Loading...`);
  await page.waitForSelector(`text=Login`);
  await page.waitForSelector(`text=ID`);
  await page.waitForSelector(`text=Beers`);
  await page.waitForSelector(`text=Brand`);
  await page.waitForSelector(`text=Name`);
  await page.waitForSelector(`text=Style`);

  // Login experience
  await page.locator("#login-button").click();
  await page.waitForSelector(`text=Cancel`);
  await page.locator("#login-mutation-button").click();
  await page.waitForSelector(`text=Hey Alan Doe!`);
  await page.waitForSelector(`text=Users`);

  // Logout experience
  await page.locator("#logout-button").click();
  await page.waitForSelector(`text=Login`);
});

test("Server checks", async ({ page }) => {
  await page.goto("http://localhost:2022/health");
  await page.waitForSelector(`text=message`);
  await page.waitForSelector(`text=ok`);
});
