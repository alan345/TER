import { test } from "@playwright/test";

test.setTimeout(5000);

test("go to /", async ({ page }) => {
  await page.goto("/");

  // check for the page
  await page.waitForSelector(`text=Trpc Express React`);
  await page.waitForSelector(`text=Loading...`);
  await page.waitForSelector(`text=Login`);
  await page.waitForSelector(`text=Size`);
  await page.waitForSelector(`text=ID`);
  await page.waitForSelector(`text=First Name`);
  await page.waitForSelector(`text=Last Name`);
  await page.waitForSelector(`text=Email`);
  await page.waitForSelector(`text=Avatar`);
  await page.waitForSelector("img");

  // Login experience
  await page.locator("#login-button").click();
  await page.waitForSelector(`text=Cancel`);
  await page.locator("#login-mutation-button").click();
  await page.waitForSelector(`text=Hey Alan Doe!`);

  // Logout experience
  await page.locator("#logout-button").click();
  await page.waitForSelector(`text=Login`);
});
