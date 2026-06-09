const { chromium } = require('playwright');
const fs = require('fs');
const csv = require('csv-parser');

function readCSV() {
  return new Promise((resolve) => {
    const results = [];

    fs.createReadStream('insurance.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results));
  });
}

(async () => {
  const patients = await readCSV();

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://cms.officeally.com/');

  console.log('Login manually...');
  await page.pause();

  for (const patient of patients) {
    await page.waitForTimeout(5000);
    await page.goto('https://pm.officeally.com/pm/ManagePatients/ManagePatients.aspx?Tab=P');
await page.waitForTimeout(5000);

    await page.locator('#ctl00_phFolderContent_ucSearch_txtSearch')
      .fill(patient.PatientName);

    await page.getByRole('button', { name: 'Search' }).click();

    await page.getByRole('link', {
      name: patient.PatientName,
      exact: true
    }).click();

    await page.getByRole('link', { name: 'Insurance' }).click();

    await page.locator('#btnMultiSelectddlPatientInsuranceType').click();

    await page.locator('label')
      .filter({ hasText: `: ${patient.InsuranceType}` })
      .first()
      .click();

    await page.locator(
      '#ctl00_phFolderContent_ucPatient_InsuranceSubscriberID'
    ).fill(patient.SubscriberID);

    await page.locator(
      '#ctl00_phFolderContent_ucPatient_InsuranceID'
    ).fill(patient.InsuranceID);

    await page.locator(
      '#ctl00_phFolderContent_ucPatient_InsuranceGroupNo'
    ).fill(patient.GroupNo);

    await page.getByRole('button', { name: 'Apply' }).click();

    console.log(
      `${patient.PatientName} insurance updated`
    );

    await page.waitForTimeout(3000);
  }

  console.log("SCRIPT FINISHED");
  await page.waitForTimeout(60000);

})();