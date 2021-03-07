const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");

async function writeToCSV(obj, csvPath) {
    console.log(">>>>>>");
    console.log(csvPath);

    // current timestamp in milliseconds

    let date_ob = new Date();

    // current date
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes;

    console.log(timestamp);

    obj.lowest_price = obj.lowest_price.replace(/,/g, ".");
    obj.median_price = obj.median_price.replace(/,/g, ".");
    obj.volume = obj.volume.replace(/,/g, ".");

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

module.exports = writeToCSV;