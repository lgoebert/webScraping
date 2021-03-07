const startScrape = require("./pageScraper");
const ObjectsToCsv = require("objects-to-csv");

const steam_cases = require("../../steam/cases/urls.json");
const steam_cases_xpath = require("../../steam/cases/xpaths.json");

const steam_weapons = require("../../steam/weapons/steam_weapons.json");
const steam_weapons_xpath = require("../../steam/weapons/xpaths.json");
//const steam_stickers = require("../../steam/steam_stickers.json");

/**
 * Selects which set of urls is being used
 * e.g.: Selects steam_cases.json to scrape all urls for cases on the steam Market.
 */
async function iterCategories() {
  let allUrls = [steam_weapons, steam_cases];
  for (let i = 0; i < allUrls.length; i++) {
    console.log("_________________________________");
    let currUrls = allUrls[i];
    let csvPath;
    let xPath;
    // if current set == steam_cases, write data into steam_cases.csv
    // if current set == steam_weapons, write data into steam_weapons.csv
    // etc...
    switch (allUrls[i]) {
      case steam_cases:
        csvPath = "../../r/steam_cases.csv";
        xPath = steam_cases_xpath;
        break;

      case steam_weapons:
        csvPath = "../../r/steam_weapons.csv";
        xPath = steam_weapons_xpath;
        break;

      case steam_stickers:
        csvPath = "../../r/steam_stickers.csv";
        break;

      default:
        console.error("not a valid set!");
        break;
    }
    let items = await start(currUrls, xPath);

    if (items != null) {
      const csv = new ObjectsToCsv(items);
      await csv.toDisk(csvPath, true); // true-> append csvFile
      console.log(await csv.toString());
    }
    console.log(currUrls);
    console.log(Object.keys(currUrls));

    console.log("++++++>>>> ");

    console.log(items);
  }
}
/**
 * Starts the scraping process
 * @param {*} url contains array of urls to be used
 */
async function start(url, xPath) {
  let items = await startScrape(url, xPath);

  return items;
}
iterCategories();
