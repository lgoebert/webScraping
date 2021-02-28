"use strict";

/* puppeteer inits */
const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(pluginStealth());
/* --------------- */

async function startBrowser() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("ERROR creating browser instance ", err);
  }
  console.log("Headless browser opened.");
  return browser;
}
module.exports = startBrowser;
