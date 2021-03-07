"use strict";
/* local files needed */
const startBrowser = require("./browser");
const handlePage = require("./pageController");

//const xpaths = require("../../steam/weapons/xpaths.json");
//const itemToFile = require("./itemToFile");
/* ------------------ */

/**
 * scrapes the given site for all xpaths
 * @param {*} page instance of a puppeteer page
 */
async function scrapeSite(page, xPath) {
  var xpaths = xPath;
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
      let currKey = Object.keys(xpaths[i]);
      console.log(`current xpath for: ${currKey}`);
      await page.waitForXPath(currxPath);
      const [el] = await page.$x(currxPath);
      const obj = await el.getProperty("textContent");
      const raw = await obj.jsonValue();

      myObj[Object.keys(myObj)[i]] = raw;
    }
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
async function startScrape(urls, xPath) {
  try {
    const instances = await init();
    const browser = instances.ibrowser;
    const page = instances.ipage;
    let allObjs = []; // contains all items(with it's info's, for all urls)

    // iterating through all urls(e.g. for each case)
    for (var key of Object.keys(urls)) {
      console.log(".....");
      let currUrl = urls[key];
      console.log(`collecting data from: ${currUrl}`);

      await page.goto(currUrl);
      let currObj = await scrapeSite(page, xPath);
      allObjs.push(currObj); // adds all Items which are being scraped into one big array of objs
    }

    // await itemToFile(allObjs); currently not used

    console.log("done. closing browser now");
    browser.close();

    return allObjs;
    //      await browser.close();
  } catch (error) {
    console.log("Error in pageScraper.js: " + error.message);
    return null;
  }
}

module.exports = startScrape;
