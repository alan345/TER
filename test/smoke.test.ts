import { test } from "@playwright/test";

test.setTimeout(5000);

test("go to /", async ({ page }) => {
  await page.goto("/");

  // check for the page
  await page.waitForSelector("img");
  await page.waitForSelector(`text=Trpc Express React`);
  await page.waitForSelector(`text=Loading...`);
  await page.waitForSelector(`text=Login`);
  await page.waitForSelector(`text=Size`);
  await page.waitForSelector(`text=ID`);
  await page.waitForSelector(`text=First Name`);
  await page.waitForSelector(`text=Last Name`);
  await page.waitForSelector(`text=Email`);
  await page.waitForSelector(`text=Avatar`);

  // Login experience
  await page.locator("#login-button").click();
  await page.waitForSelector(`text=Cancel`);
  await page.locator("#login-mutation-button").click();
  await page.waitForSelector(`text=Hey Alan Doe!`);

  // Logout experience
  await page.locator("#logout-button").click();
  await page.waitForSelector(`text=Login`);
});

test("Server checks", async ({ page }) => {
  await page.goto("http://localhost:2022/health");
  await page.waitForSelector(`text=message`);
  await page.waitForSelector(`text=ok`);
});
