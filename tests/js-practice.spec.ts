import{test, expect} from '@playwright/test';

test('variable in playwright', async({page}) =>{

const url = '/login';
const username = 'tomsmith';
const password = 'SuperSecretPassword!';
let count = 0;

console.log(`Going to: ${url}`);
console.log(`Username: ${username}`);
console.log(`Count start: ${count}`);

count = 5;
console.log(`Count changed: ${count}`);

await page.goto(url);
await page.getByLabel('Username').fill(username);
await page.getByLabel('Password').fill(password);
await page.getByRole('button', {name: 'Login'}).click();

await expect(page.getByText('You logged into a secure area!')).toBeVisible();

});
test('objects in playwright', async ({ page }) => {

    const user = {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    };
  
    console.log(`Logging in as: ${user.username}`);
  
    await page.goto('/login');
    await page.getByLabel('Username').fill(user.username);
    await page.getByLabel('Password').fill(user.password);
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  });
  
test('arrays in playwright', async ({ page }) => {

    // array of test users
    const testUsers = [
      { username: 'tomsmith', password: 'SuperSecretPassword!' }
    ];
  
    // access first user
    const user = testUsers[0];
    console.log(`Testing with: ${user.username}`);
  
    await page.goto('/login');
    await page.getByLabel('Username').fill(user.username);
    await page.getByLabel('Password').fill(user.password);
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  });
// helper function outside test
async function doLogin(page, user) {
  await page.goto('/login');
  await page.getByLabel('Username').fill(user.username);
  await page.getByLabel('Password').fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();
}

test('functions in playwright', async ({ page }) => {
  const user = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!'
  };

  await doLogin(page, user);

  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});
  