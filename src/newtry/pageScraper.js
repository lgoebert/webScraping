"use strict";
/* local files needed */
const startBrowser = require("./browser");
const handlePage = require("./pageController");
const steam_urls = require("../../config/steam/steam_cases.json");
const xpaths = require("../../config/steam/steam_xpaths.json");
const itemToFile = require("./itemToFile");
/* ------------------ */

/**
 * scrapes the given site for all xpaths
 * @param {*} page instance of a puppeteer page
 */
async function scrapeSite(page) {
  var myObj = {
    name: "",
    buy_price: "",
    buy_reqnum: "",
    sell_price: "",
    sell_num: "",
  };
  try {
    for (let i = 0; i < xpaths.length; i++) {
      let currxPath = Object.values(xpaths[i]);
      //let currKey = Object.keys(xpaths[i]);

      await page.waitForXPath(currxPath);
      const [el] = await page.$x(currxPath);
      const obj = await el.getProperty("textContent");
      const raw = await obj.jsonValue();

      myObj[Object.keys(myObj)[i]] = raw;
    }
    console.log(myObj);
  } catch (error) {
    console.error(error.message);
  }
  return myObj;
}
/**
 *  init browser and page
 */
async function init() {
  let browser = await startBrowser();
  if (browser != undefined) {
    console.log("Browser returned successfully");
  } else {
    console.log("Browser undefined. Exiting");
    return;
  }
  let page = await handlePage(browser);
  if (page != undefined) {
    console.log("Page returned successfully");
  } else {
    console.log("Page undefined. Exiting");
    return;
  }
  return {
    ibrowser: browser,
    ipage: page,
  };
}
/**
 * Starts the scraping process. After returning from scrapeSite(), it writes the Objects
 * into items.json
 * @param {*} urls contains json array of all urls wished to be scraped
 */
async function scrape(urls) {
  const instances = await init();
  const browser = instances.ibrowser;
  const page = instances.ipage;
  let allObjs = []; // contains all items(with it's info's, for all urls)

  // iterating through all urls(e.g. for each case)
  for (var key of Object.keys(urls)) {
    let myurl = urls[key];
    await page.goto(myurl);
    let currObj = await scrapeSite(page);
    allObjs.push(currObj);
  }

  // write all objects, which were collected together in
  await itemToFile(allObjs);
  console.log("done. closing browser now");
  await browser.close();
}

module.exports = scrape;
//scrape(steam_urls);
