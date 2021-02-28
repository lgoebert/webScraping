const startScrape = require("./pageScraper");
const ObjectsToCsv = require("objects-to-csv");
const steam_cases = require("../../steam/cases/urls.json");
const steam_weapons = require("../../config/steam/steam_weapons.json");
const steam_stickers = require("../../config/steam/steam_stickers.json");

/**
 * Selects which set of urls is being used
 * e.g.: Selects steam_cases.json to scrape all urls for cases on the steam Market.
 */
async function iterCategories() {
  let allUrls = [steam_cases, steam_weapons];
  for (let i = 0; i < allUrls.length; i++) {
    console.log("_________________________________");
    let currUrl = allUrls[i];
    let items = await start(currUrl);
    let csvPath;
    // if current set == steam_cases, write data into steam_cases.csv
    // if current set == steam_weapons, write data into steam_weapons.csv
    // etc...
    switch (allUrls[i]) {
      case steam_cases:
        csvPath = "../../r/steam_cases.csv";
        break;

      case steam_weapons:
        csvPath = "../../r/steam_weapons.csv";
        break;

      case steam_stickers:
        csvPath = "../../r/steam_stickers.csv";
        break;

      default:
        console.error("not a valid set!");
        break;
    }

    if (items != null) {
      const csv = new ObjectsToCsv(items);
      await csv.toDisk(csvPath);
      console.log(await csv.toString());
    }
    console.log(currUrl);
    console.log(Object.keys(currUrl));

    console.log("++++++>>>> ");

    console.log(items);
  }
}

async function start(url) {
  let items = await startScrape(url);

  return items;
}
iterCategories();
