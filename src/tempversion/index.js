/*initialize vars + requiring*/
var urls = require("../../config/steam_urls.json");
var item = require("../../config/item.json");
var xpaths = require("../../config/xpaths.json");
let puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(pluginStealth());
var itemArr = [];
/* vars */
var browser = null;
var page = null;

const passUserAgentTest = async (page) => {
  let userAgent =
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0";
  await page.setUserAgent(userAgent);
  console.log("userAgent Test ok.");
};

async function scrapeSite(url, page, browser) {
  try {
    await passUserAgentTest(page);

    console.log(typeof url);
    console.log(url);

    await page.goto(url);
  } catch (error) {
    console.log("Error: " + error.message);
  }
  try {
    // iterating through all xPath on this page in order to get e.g. price, name, availability,...
    // 0 - name
    // 1 - buy_price
    // 2 - buy_reqnum
    // 3 - sell_price
    // 4 - sell_num

    for (let i = 0; i < xpaths.length; i++) {
      let currxPath = Object.values(xpaths[i]);
      let currKey = Object.keys(xpaths[i]);

      //console.log(`scraping ${Object.keys(xpaths[i])}`);

      await page.waitForXPath(currxPath);
      const [el] = await page.$x(currxPath);
      const text = await el.getProperty("textContent");
      const raw = await text.jsonValue();
      // key von path holen, dann in item.json mit selbem namen schreiben
      itemArr.push(raw);
    }
    console.log(itemArr);
  } catch (error) {
    console.error(error.message);
  } finally {
    await browser.close();
  }
}
async function init() {
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
    page = await browser.newPage();
    console.log(typeof browser);
    console.log(typeof page);
  } catch (err) {
    console.log(err.message);
  }
  return {
    first: page,
    second: browser,
  };
}
async function start() {
  var retvals = await init();
  browser = retvals.second;
  page = retvals.first;

  console.log("here: ");
  console.log(typeof browser);
  console.log(typeof page);
  console.log(urls);

  for (var key of Object.keys(urls)) {
    var myurl = urls[key];
  }
  console.log("here: " + myurl);
  scrapeSite(myurl, page, browser);
}
start();
