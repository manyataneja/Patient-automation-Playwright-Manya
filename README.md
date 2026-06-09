# Office Ally Patient Automation

## Project Overview

This project was created to automate the patient registration workflow in Office Ally CMS using Playwright.

The objective of this project is to reduce manual data entry by automating navigation to the Add New Patient page and preparing a workflow that can populate patient information using CSV-based test data.

The project was developed using Playwright Codegen to record browser actions, identify selectors, and understand the patient creation workflow.

---

## Project Goals

- Automate patient creation workflow
- Reduce manual effort
- Learn Playwright automation
- Understand selector identification
- Work with CSV-based data
- Explore real-world web automation

---

## Technologies Used

- Playwright
- Node.js
- VS Code
- CSV Files
- Office Ally CMS

---

## Environment Setup

### Install Node.js

Verify installation:

```bash
node -v
npm -v
```

### Create Project Folder

```bash
mkdir Office-Ally-Patient-Automation
cd Office-Ally-Patient-Automation
```

### Initialize Node Project

```bash
npm init -y
```

### Install Playwright

```bash
npm install -D @playwright/test
```

### Install Playwright Browsers

```bash
npx playwright install
```

If required:

```bash
npx.cmd playwright install
```

---



Run the test:

```bash
npx.cmd playwright test --headed
```

---

## Recording Office Ally Actions

Playwright Codegen was used to record browser actions automatically.

```bash
npx.cmd playwright codegen
```

### Actions Performed

1. Open Office Ally CMS
2. Login
3. Navigate to Manage Patients
4. Open Add New Patient

Example Recorded Code:

```javascript
await page.getByText('Manage Patients').click();

await page.getByText('Add New Patient', { exact: true }).click();
```

---

## Fields Identified

### Patient Information

- Patient Account Number
- First Name
- Last Name
- DOB
- Gender

### Address Information

- Address
- City
- State
- ZIP Code

### Contact Information

- Home Phone
- Email

### Insurance Information

- Insurance ID
- Insurance Details

Selectors were identified using Playwright Inspector.

---

## Sample CSV Data

Patient ID,Status,"Patient Name (Last, First MI)",Patient Account Number,Patient Address,Patient City,Patient State,Patient Zip,Patient Home Phone,Patient Preferred Language,Race,Ethnicity,Email,Acct. Type,DOB,Sex,Guarantor ID,Guarantor Name,Primary Insured ID,Primary Insured Name,Primary Insurance,Sec. Insured ID,Sec. Insured Name,Sec. Insurance,Primary Provider,"Employer Name",Employer Address,Employer City,Employer State,Employer Zip,Employer Phone,Emergency Contact,Emergency Address,Emergency City,Emergency State,Emergency Zip,Emergency Phone,UD1: ,UD2: ,UD3: ,UD4: ,UD5: ,UD6: 
1,Active,"Taneja, Manya",PA1001,"123 Green Avenue","Ludhiana","PA","141001","9876543210","English","Asian","Not Hispanic","manyataneja1212@gmailcom","Self-Pay","12/03/2006","F","G1001","Manya Taneja","INS10001","Manya Taneja","Demo Insurance","","","","Dr. Sharma","ABC Technologies","45 Business Park","Ludhiana","PA","141002","9876500000","Riya Taneja","123 Model Town","Ludhiana","Punjab","141001","9876543211","","","","","",""

---

## Automation Workflow

1. Open Office Ally CMS
2. Login to the application
3. Navigate to Manage Patients
4. Open Add New Patient
5. Read patient data from CSV
6. Fill patient details
7. Save patient record
8. Repeat process for additional patients

---

## Commands Used

### Verify Node Installation

```bash
node -v
npm -v
```

### Initialize Project

```bash
npm init -y
```

### Install Playwright

```bash
npm install -D @playwright/test
```

### Install Browsers

```bash
npx.cmd playwright install
```

### Open Playwright Code Generator

```bash
npx.cmd playwright codegen
```

### Run Automation

```bash
npx.cmd playwright test --headed
```

---

## Learning Outcomes

- Playwright Automation
- Browser Automation
- Playwright Codegen
- Selector Identification
- CSV Data Handling
- Data-Driven Testing
- Web Application Automation

---

## Future Improvements

- Complete CSV integration
- Bulk patient creation
- Screenshot reporting
- Error handling
- Validation checks
- End-to-end patient onboarding automation

---

## Author

**MANYA TANEJA**

