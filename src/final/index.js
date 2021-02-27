"use strict";
/* local files needed */
const startBrowser = require("./browser");
const handlePage = require("./pageController");
const steam_urls = require("../../config/steam_urls.json");
const item = require("../../config/item.json");
const xpaths = require("../../config/xpaths.json");
/* ------------------ */

/* puppeteer inits */
const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(pluginStealth());
/* --------------- */

/* vars */
var browser = null;
var page = null;
var itemArr = [];
/* ---- */
const passUserAgentTest = async (page) => {
  let userAgent =
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0";
  await page.setUserAgent(userAgent);
  console.log("UserAgentTest succeeded.");
};
async function scrapeSite() {
  //try {
  // iterating through all xPath on this page in order to get e.g. price, name, availability,...
  // 0 - name
  // 1 - buy_price
  // 2 - buy_reqnum
  // 3 - sell_price
  // 4 - sell_num
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

  for (let j = 0; j < steam_urls.length; j++) {
    let url = Object.values(steam_urls[j]);
    console.log("url: " + url);
    try {
      url = JSON.stringify(url);

      page = await browser.newPage();
      passUserAgentTest(page);
      console.log("here: " + typeof url);

      await page.goto(url);
    } catch (error) {
      console.log(error.message);
    }

    for (let i = 0; i < xpaths.length; i++) {
      let currxPath = Object.values(xpaths[i]);
      let currKey = Object.keys(xpaths[i]);
      console.log(currxPath);
      //console.log(`scraping ${Object.keys(xpaths[i])}`);

      await page.waitForXPath(currxPath);
      const [el] = await page.$x(currxPath);
      const text = await el.getProperty("textContent");
      const raw = await text.jsonValue();
      // key von path holen, dann in item.json mit selbem namen schreiben
      itemArr.push(raw);
    }

    console.log(itemArr);
    //} catch (error) {
    //console.log("Error here:" + error.message);
    // }  /* --------------------- */
  }
}

// async function travelXPaths(url) {}
async function travelUrls(page) {
  for (let i = 0; i < steam_urls.length; i++) {
    let url = Object.values(steam_urls[i]);
    console.log("url: " + url);
    if (page === null) {
      console.log("kljflköasdjflkas");
      return;
    }

    scrapeSite(url);

    // finally { await browser.close();}
  }
}
async function travelXPaths(page) {
  for (let i = 0; i < xpaths.length; i++) {
    let currxPath = Object.values(xpaths[i]);
    let currKey = Object.keys(xpaths[i]);
    console.log(currxPath);
    //console.log(`scraping ${Object.keys(xpaths[i])}`);

    await page.waitForXPath(currxPath);
    const [el] = await page.$x(currxPath);
    const text = await el.getProperty("textContent");
    const raw = await text.jsonValue();
    // key von path holen, dann in item.json mit selbem namen schreiben
    itemArr.push(raw);
  }

  console.log(itemArr);
  //} catch (error) {
  //console.log("Error here:" + error.message);
  // }
}
scrapeSite();
