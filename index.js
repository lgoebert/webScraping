/*const browserObject = require("./browser");
const scraperController = require("./pageController");

s//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance);
*/

/*initialize vars + requiring*/
var urls = require("./urls.json");
var xpaths = require("./xpaths.json");
let puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");

puppeteer.use(pluginStealth());

var browser = null;
var page = null;
const passUserAgentTest = async (page) => {
  console.log("setting up for userAgent Test...");
  let userAgent =
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0";
  await page.setUserAgent(userAgent);
};

async function scrapeSite(url) {
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
    page = await browser.newPage();
    await passUserAgentTest(page);

    await page.goto(url);
  } catch (error) {
    console.log("Error creating browser " + error.message);
  }
  try {
    // iterating through all xPath on this page in order to get e.g. price, name, availability,...
    for (let i = 0; i < xpaths.length; i++) {
      let currxPath = Object.values(xpaths[i]);
      console.log(`scraping ${Object.keys(xpaths[i])}`);

      await page.waitForXPath(currxPath);

      const [el] = await page.$x(currxPath);

      const text = await el.getProperty("textContent");
      const raw = await text.jsonValue();
      console.log(raw);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    await browser.close();
  }
}

scrapeSite("https://steamcommunity.com/market/listings/730/Fracture%20Case");
