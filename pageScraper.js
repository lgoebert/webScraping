var urls = require("./urls.json");
var urls = require("./urls.json");
console.log(Object.values(urls[0]));

//for (let i = 0; i < urls.length; i++) {
let scraperObject = {
  url:
    "https://steamcommunity.com/market/search?category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Weapon%5B%5D=any&category_730_Type%5B%5D=tag_CSGO_Type_WeaponCase&appid=730&q=Waffenkiste#p1_name_desc",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    //price
    const [el] = await page.$x(
      "/html/body/div[1]/div[7]/div[2]/div[1]/div[4]/div[2]/div[2]/div/div[1]/a[1]/div/div[1]/div[2]/span[1]/span[1]"
    );
    const text = await el.getProperty("textContent");
    const raw = text.jsonValue();
    console.log(raw);
    browser.close();
  },
};

module.exports = scraperObject;
