var urls = require("./urls.json");
var xpaths = require("./xpaths.json");

const buy_price = xpaths.buy_price;
const buy_reqnum = xpaths.buy_reqnum;
const itemName = xpaths.name;

console.log(itemName);
console.log(buy_reqnum);
console.log(buy_price);

const preparePageForTests = async (page) => {
  console.log("setting up for userAgent Test...");
  let userAgent =
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0";
  await page.setUserAgent(userAgent);
};
//for (let i = 0; i < urls.length; i++) {

let scraperObject = {
  url: "https://steamcommunity.com/market/listings/730/Fracture%20Case",
  async scraper(browser) {
    //try {

    const page = await browser.newPage();
    await preparePageForTests(page);

    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    //price
    await page.waitForXPath(buy_price);
    const [el] = await page.$x(buy_price);
    const text = await el.getProperty("textContent");
    const raw = await text.jsonValuPro;
    //} catch (error) {
    console.error("ohman" + error.message);
    // }
  },
};

module.exports = scraperObject;
