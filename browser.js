let puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(pluginStealth());

async function startBrowser() {
  let browser;
  try {
    console.log("Opening headless browser...");
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("ERROR creating browser instance ", err);
  }
  return browser;
}
module.exports = {
  startBrowser,
};
