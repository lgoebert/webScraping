const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const utils = require("./utils");

const FileSystem = require("fs");

async function writeToCSV(obj, csvPath) {
    let cutPath = csvPath.split("/");
    console.log("saved at: " + cutPath[1] + "/" + cutPath[2] + "/");

    // current timestamp in milliseconds
    let timestamp = await utils.currentDateTime();
    console.log("time: " + timestamp);
    try {
        console.log("lowest: " + obj.lowest_price);
        obj.lowest_price = obj.lowest_price.replace(/,/g, ".");
        console.log("median: " + obj.median_price);
        obj.median_price = obj.median_price.replace(/,/g, ".");
        console.log("volume: " + obj.volume);
        obj.volume = obj.volume.replace(/,/g, ".");
    } catch (error) {
        console.error("Some data undefined:  " + error.message);
    }
    if (obj.lowest_price == "") {
        console.log("Price not available. Returning.");
        return;
    } else {
        CSVToJSON()
            .fromFile(csvPath)
            .then((source) => {
                source.push({
                    date: timestamp,
                    lowest_price: obj.lowest_price,
                    median_price: obj.median_price,
                    volume: obj.volume,
                });
                var csv = JSONToCSV(source, {
                    fields: ["date", "lowest_price", "median_price", "volume"],
                });
                FileSystem.writeFileSync(csvPath, csv);
            });
    }
}

module.exports = writeToCSV;