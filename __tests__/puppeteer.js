const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   await browser.close();
// })();


test('Login a User, and Search the Database, and Retrieve Results and LogOut', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const userReg = 'http://localhost:8080';
  await page.goto(userReg);
  await page.type('input#emailField', 'test@test.com');
  await page.type('input#passwordField', 'abc');
  await Promise.all([
    page.waitForNavigation(),
    page.click('button#loginButton'),
    await page.select('select#searchBox', 'Queens'),
    await page.type('input#search', '39-65 52nd'),
    page.click('button#searchButton'),
  ]);
 page.screenshot({ path: 'search Results' });
});