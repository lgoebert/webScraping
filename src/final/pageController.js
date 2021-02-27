"use strict";
const browser = require("./browser");

let page = null;

const passUserAgentTest = async (page) => {
  let userAgent =
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0";
  await page.setUserAgent(userAgent);
  console.log("UserAgentTest succeeded.");
};

async function handlePage(browser) {
  try {
    page = await browser.newPage();
    passUserAgentTest(page);
  } catch (err) {
    console.log("Error in pageController: ", err);
  }
  return page;
}

module.exports = handlePage;
