# Playwright Learning Guide

## Setup Commands

```bash
npm init playwright@latest    # Setup playwright project
npx playwright install        # Install all browsers
```

---

## Run Commands

```bash
npx playwright test                                          # Run all tests on all browsers
npx playwright test --headed                                 # Run with browser visible
npx playwright test --ui                                     # Open UI mode
npx playwright test --debug                                  # Run in debug mode
npx playwright test tests/saucedemo.spec.ts                  # Run specific file
npx playwright test tests/saucedemo.spec.ts --project=chromium  # Run on one browser only
npx playwright test --grep "test name"                       # Run test by name
npx playwright test --timeout=60000                          # Set timeout (ms)
npx playwright show-report                                   # Open HTML report
npx playwright codegen                                       # Auto generate test code
npx playwright codegen https://www.saucedemo.com             # Codegen on specific URL
npx ts-node --esm js-basics/file.ts                         # Run TypeScript file
```

---

## Test Structure

```typescript
import { test, expect } from '@playwright/test';

test('test name', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

---

## Locators (How to find elements)

### When to use which locator:
| What you see on page | Locator to use |
|---|---|
| Form input with label | `getByLabel('Email')` |
| Button | `getByRole('button', { name: 'Submit' })` |
| Link | `getByRole('link', { name: 'Home' })` |
| Any visible text | `getByText('Sign in')` |
| Input placeholder | `getByPlaceholder('Enter email')` |
| Image | `getByAltText('Logo')` |
| Title attribute | `getByTitle('Search')` |
| data-testid attribute | `getByTestId('submit-btn')` |
| data-test attribute | `locator('[data-test="username"]')` |
| HTML id | `locator('#id')` |
| HTML class | `locator('.classname')` |
| HTML attribute | `locator('input[type="checkbox"]')` |

```typescript
// Recommended — use these first
page.getByLabel('Username')
page.getByRole('button', { name: 'Submit' })
page.getByRole('link', { name: 'Home' })
page.getByText('Sign in')
page.getByPlaceholder('Enter email')
page.locator('[data-test="username"]')     // most reliable in real projects

// CSS / HTML — use when above don't work
page.locator('#id')
page.locator('.classname')
page.locator('div > button')

// Multiple elements
page.locator('input').first()
page.locator('input').last()
page.locator('input').nth(1)
await page.locator('input').count()
```

---

## Actions (What to do on elements)

```typescript
// Typing
await locator.fill('text')               // clear + type text
await locator.clear()                    // clear input field

// Clicking
await locator.click()                    // single click
await locator.dblclick()                 // double click
await locator.hover()                    // hover over element

// Keyboard
await page.keyboard.press('Enter')
await page.keyboard.press('Tab')
await page.keyboard.press('Escape')

// Forms
await locator.selectOption('value')      // select dropdown option
await locator.check()                    // check checkbox
await locator.uncheck()                  // uncheck checkbox

// Navigation
await page.goto('https://...')
await page.goBack()
await page.goForward()
await page.reload()
```

---

## Assertions (How to check things)

```typescript
// Page level
await expect(page).toHaveTitle('Google')
await expect(page).toHaveTitle(/Google/)
await expect(page).toHaveURL('/login')
await expect(page).toHaveURL(/inventory/)

// Visibility
await expect(locator).toBeVisible()
await expect(locator).toBeHidden()

// State
await expect(locator).toBeEnabled()
await expect(locator).toBeDisabled()
await expect(locator).toBeChecked()

// Text
await expect(locator).toHaveText('exact text')
await expect(locator).toContainText('partial')
await expect(locator).toHaveValue('value')
await expect(locator).toHaveText(['item1', 'item2'])  // array — checks a list

// Count
await expect(locator).toHaveCount(3)

// NOT — opposite of any assertion
await expect(locator).not.toBeVisible()
await expect(locator).not.toBeChecked()
```

---

## Page Object Model (POM)

Each page of the website gets its own class. Tests use the class methods instead of raw locators.

```typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;   // declare field
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');  // assign value
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);   // use value
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### 3-step locator pattern:
| Step | Code | Purpose |
|------|------|---------|
| Declare | `readonly usernameInput: Locator` | Field exists |
| Assign | `this.usernameInput = page.locator(...)` | Give it a value |
| Use | `await this.usernameInput.fill(...)` | Do the action |

### Action vs Value methods:
- Action (click, fill) → use `await`
- Value (count, text) → use `return`

---

## Fixtures

Custom fixtures inject page objects automatically into tests.

```typescript
// tests/fixture.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = { loginPage: LoginPage; };

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);  // test runs here
  },
});

export { expect } from '@playwright/test';
```

```typescript
// In tests — loginPage is injected automatically
test('valid login', async ({ loginPage, page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});
```

---

## Test Organisation

```typescript
// Grouping with describe
test.describe('Login Tests', () => {
  test('valid login', ...)
  test('invalid login', ...)
});

// Annotations
test.only('focus on this test', ...)   // run only this test
test.skip('skip this test', ...)       // skip this test
test.fixme('broken test', ...)         // mark as needs fixing

// Data-driven — same test with multiple data sets
const loginTests = [
  { username: 'wrong_user', password: 'wrong_pass', description: 'invalid credentials' },
  { username: 'locked_out_user', password: 'secret_sauce', description: 'locked out user' },
];

for (const data of loginTests) {
  test(`login fails - ${data.description}`, async ({ loginPage, page }) => {
    await loginPage.login(data.username, data.password);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
}
```

---

## TypeScript Basics

```typescript
// Basic types
let siteName: string = 'SauceDemo';
let itemCount: number = 3;
let isVisible: boolean = true;
let browsers: string[] = ['chromium', 'firefox', 'webkit'];

// type — blueprint with = sign
type User = {
  username: string;
  password: string;
  role?: string;       // optional field
};

// interface — blueprint without = sign
interface Product {
  name: string;
  price: number;
}

// readonly — cannot be changed after set
type Config = {
  readonly baseURL: string;
};

// private — only usable inside the class
constructor(private page: Page) {}
```

---

## Folder Structure

```
playwright-learning/
├── pages/                     # Page Object classes
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                     # Test files
│   ├── fixture.ts             # Custom fixtures
│   └── saucedemo.spec.ts      # 7 tests
├── js-basics/                 # JavaScript/TypeScript practice
│   ├── arrowfunctions.js
│   ├── classes.js
│   └── typescript-basics.ts
├── playwright-report/         # HTML report (after test run)
├── test-results/              # Screenshots/videos of failures
├── package.json
└── playwright.config.ts       # baseURL, browsers, screenshot, video, trace
```

---

## How Tests Multiply

```
7 tests  x  3 browsers  =  21 tests total
(Chromium, Firefox, Safari run by default)
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Timeout exceeded | Element not found / slow site | Check locator with codegen |
| `toBe(1)` received `undefined` | Used `await` instead of `return` in value method | Change to `return` |
| `toBe(0)` received wrong count | Wrong locator for element | Use codegen to find correct locator |
| Element not clickable | `data-test` points to image inside button | Use button's `#id` instead |
| Unknown parameter | Fixture file name mismatch | Check import path matches exact filename |
| test.only left in code | Forgot to remove | Always remove before committing |

---

## Learning Progress

- [x] Step 1 — Setup & run first test
- [x] Step 2 — Folder structure
- [x] Step 3 — Test file structure
- [x] Step 4 — Locators
- [x] Step 5 — Actions
- [x] Step 6 — Assertions
- [x] Step 7 — Codegen
- [x] Step 8 — Hooks (beforeEach, afterEach)
- [x] Step 9 — Page Object Model (POM)
- [x] Step 10 — Fixtures
- [x] Step 11 — test.describe grouping
- [x] Step 12 — Annotations (only, skip, fixme)
- [x] Step 13 — Data-driven testing
- [x] Step 14 — TypeScript basics
- [x] Step 15 — Real project on saucedemo.com (7 tests)
- [ ] Step 16 — Run all 3 browsers
- [ ] Step 17 — HTML report deep dive
