const browserObject = require("./browser");
const scraperController = require("./pageController");

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance);

/*const puppeteer = require("puppeteer");

async function scrapeSite(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x(
    "/html/body/div[1]/div[7]/div[2]/div[1]/div[4]/div[2]/div[2]/div/div[1]/a[3]/div/div[1]/div[2]/span[1]/span[1]"
  );

  const price = await el.getProperty("textContent");
  const raw = await price.jsonValue();
  console.log("price:");
  console.log(raw);
  browser.close();
}

scrapeSite("https://steamcommunity.com/market/search?q=");
*/
