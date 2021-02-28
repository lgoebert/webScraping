const steam_cases = require("../../config/steam/steam_cases.json");
const startScrape = require("./pageScraper");
const ObjectsToCsv = require("objects-to-csv");

async function start() {
  let items = await startScrape(steam_cases);
  if (items != null) {
    const csv = new ObjectsToCsv(items);
    await csv.toDisk("./test.csv");
    //console.log(await csv.toString());
  }
}
start();
