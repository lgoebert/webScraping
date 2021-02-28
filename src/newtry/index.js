"use strict";
/* local files needed */
const startBrowser = require("./browser");
const handlePage = require("./pageController");
const steam_urls = require("../../config/steam_urls.json");
const item = require("../../config/item.json");
const xpaths = require("../../config/xpaths.json");
/* ------------------ */

/* vars */
var browser = null;
var page = null;
var itemArr = [];
/* ---- */

async function scrapeSite(url, page, browser) {
  try {
    for (let i = 0; i < xpaths.length; i++) {
      let currxPath = Object.values(xpaths[i]);
      let currKey = Object.keys(xpaths[i]);

      //console.log(`scraping ${Object.keys(xpaths[i])}`);

      await page.waitForXPath(currxPath);
      const [el] = await page.$x(currxPath);
      const text = await el.getProperty("textContent");
      const raw = await text.jsonValue();
      // key von path holen, dann in item.json mit selbem namen schreiben
      await itemArr.push(raw);
    }
    console.log(itemArr);
  } catch (error) {
    console.error(error.message);
  } finally {
    await browser.close();
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
async function start(urls) {
  const instances = await init();
  browser = instances.ibrowser;
  page = instances.ipage;

  console.log("here: ");
  console.log(typeof browser);
  console.log(typeof page);

  for (var key of Object.keys(urls)) {
    var myurl = urls[key];
  }
  console.log(myurl);
  myurl = JSON.stringify(myurl);
  console.log(typeof myurl);

  await scrapeSite(myurl, page, browser);
}
start(steam_urls);
