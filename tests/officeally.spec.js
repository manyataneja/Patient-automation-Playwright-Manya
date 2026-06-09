const { test } = require('@playwright/test');

test('Office Ally', async ({ page }) => {

  await page.goto('https://cms.officeally.com/');

  await page.pause();

});