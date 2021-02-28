"use strict";
/* local files needed */
const startBrowser = require("./browser");
const handlePage = require("./pageController");
const steam_urls = require("../../config/steam_urls.json");
const items = require("../../config/item.json");
const xpaths = require("../../config/xpaths.json");
const itemToFile = require("./itemToFile");
/* ------------------ */

/* vars */
var browser = null;
var page = null;
var itemArr = [];
/* ---- */

async function scrapeSite(page, browser) {
  let temp = {
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

      await page.waitForXPath(currxPath);
      const [el] = await page.$x(currxPath);
      const obj = await el.getProperty("textContent");

      const raw = await obj.jsonValue();

      console.log(typeof raw);
      console.log(raw);
      await itemToFile(raw);
      // key von path holen, dann in item.json mit selbem namen schreiben
      await itemArr.push(raw);
    }
    console.log(itemArr);
  } catch (error) {
    console.error(error.message);
  }
}
async function init() {
  /* init browser and page */

  browser = await startBrowser();
  if (browser != undefined) {
    console.log("Browser returned successfully");
  } else {
    console.log("Browser undefined. Exiting");
    return;
  }
  page = await handlePage(browser);
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
async function scrape(urls) {
  const instances = await init();
  browser = instances.ibrowser;
  page = instances.ipage;

  for (var key of Object.keys(urls)) {
    var myurl = urls[key];
    await page.goto(myurl);
    await scrapeSite(page, browser);
  }
}

scrape(steam_urls);
