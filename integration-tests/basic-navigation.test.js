/**
 * an integration that does the following:
 * 
 * 1. Starts our application server on an unoccupied port
2. Launches a headless Chrome browser and opens a page
3. Navigates to our application’s home page
4. Finds a link with data-test-id="about" and clicks it
5. Waits for the navigation to happen
6. Verifies that we are on the /about page
 */


const portfinder = require('portfinder');
const puppeteer = require('puppeteer');

const app = require('../meadowlark.js');

let server = null;
let port = null;

//start our server before each test
beforeEach(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

// stop server after each test
afterEach (()=> {
    server.close();
})

test('home page links to about page', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://localhost:${port}`);

    expect(page.url().toBe(`http://localhost:${port}`/about));
    await browser.close();
})