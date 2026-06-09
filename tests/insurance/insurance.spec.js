const { chromium } = require('playwright');
const fs = require('fs');
const csv = require('csv-parser');

function readCSV() {

  return new Promise((resolve) => {

    const results = [];

    fs.createReadStream('patients.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results));

  });

}

(async () => {

  const patients = await readCSV();

  const browser = await chromium.launch({
    headless: false,
    slowMo: 250
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  // OPEN WEBSITE
  await page.goto(
    'https://cms.officeally.com/'
  );

  // LOGIN BUTTON
  await page.getByRole('button', {
    name: 'Login'
  }).click();

  // WAIT POPUP
  const popupPromise =
    page.waitForEvent('popup');

  // PRACTICE MATE
  await page.getByRole('link', {
    name: 'Office Ally Practice Mate'
  }).click();

  const page1 = await popupPromise;

  // LOGIN
  await page1.getByRole('textbox', {
    name: 'Username'
  }).fill('horizondemo');

  await page1.getByRole('textbox', {
    name: 'Password'
  }).fill('Horizonrs234$');

  await page1.getByRole('button', {
    name: 'Continue'
  }).click();

  // WAIT
  await page1.waitForTimeout(10000);

  // LOOP CSV
  for (const patient of patients) {

    console.log(patient);

   await page1.waitForLoadState('networkidle');
    // MANAGE PATIENTS
    await page1.getByText(
      'Manage Patients'
    ).click();

    // WAIT
    await page1.waitForTimeout(5000);

    await page1.pause();
   
    // ADD NEW PATIENT
   await page1.getByText('Add Patient').click();

    // WAIT
    await page1.waitForTimeout(5000);

    // SPLIT NAME
    const [lastName, firstName] =
      patient.PatientName
      .split(',')
      .map(x => x.trim());

    // ACCOUNT NUMBER
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_PatientAccountNo_new'
    ).fill(
      patient.PatientAccountNumber
    );

    // LAST NAME
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_LastName'
    ).fill(lastName);

    // FIRST NAME
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_FirstName'
    ).fill(firstName);

    // GENDER
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_lstGender'
    ).selectOption(
      patient.Sex
    );

    // DOB
    const dob =
      patient.DOB.split('/');

    // OPEN CALENDAR
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_DOB_Calendar'
    ).click();

    // YEAR
    await page1.locator(
      '.ui-datepicker-year'
    ).selectOption(
      dob[2]
    );

    // MONTH
    await page1.locator(
      '.ui-datepicker-month'
    ).selectOption(
      String(parseInt(dob[0]) - 1)
    );

    // DAY
    await page1.getByRole('link', {
      name: String(parseInt(dob[1]))
    }).click();

    // WEIGHT
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_Weight'
    ).fill(
      patient.Weight
    );

    // MARITAL STATUS
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_lstMaritalStatus'
    ).selectOption(
      patient.MaritalStatus
    );

    // HEIGHT
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_Height'
    ).fill(
      patient.Height
    );

    // LANGUAGE
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_ddlLanguage'
    ).selectOption(
      patient.Language
    );

    // ADDRESS 1
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_AddressLine1'
    ).fill(
      patient.PatientAddressLine1
    );

    // ADDRESS 2
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_AddressLine2'
    ).fill(
      patient.PatientAddressLine2
    );

    // CITY
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_City'
    ).fill(
      patient.PatientCity
    );

    // ZIP
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_Zip'
    ).fill(
      patient.PatientZip
    );

    // STATE
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_lstState'
    ).selectOption(
      patient.PatientState
    );

    // PHONE
    const phone =
      patient.PatientHomePhone
      .replace(/\D/g,'');

    // AREA CODE
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_HomePhone_AreaCode'
    ).fill(
      phone.slice(0,3)
    );

    // PREFIX
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_HomePhone_Prefix'
    ).fill(
      phone.slice(3,6)
    );

    // NUMBER
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_HomePhone_Number'
    ).fill(
      phone.slice(6,10)
    );

    // EMAIL
    await page1.locator(
      '#ctl00_phFolderContent_ucPatient_Email'
    ).fill(
      patient.Email
    );

    // WAIT
    await page1.waitForTimeout(3000);

    // SAVE
    await page1.getByRole('button', {
      name: 'Add Patient'
    }).click();

    console.log(
      `Patient Added Successfully`
    );

    // WAIT
    await page1.waitForTimeout(8000);

  }

})();