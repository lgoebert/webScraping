const https = require("https");
const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");
const items = require("./json/items.json");

var name = "";
var time = "";
var ms = "";
var date = "";

// vorraussetzung: Reihenfolge der items in itemsCSV.json muss gleich derer in items.json sein.
var urls = require("./json/items.json");
var csvs = require("./json/itemsCSV.json");
//console.log(urls);
console.log(Object.keys(urls).length);
var len = Object.keys(urls).length;
async function iterateItems(urls, csvs) {
    for (var i = 0; i < len; i++) {
        console.log("-------------");
        url = await Object.values(urls)[i];
        csvPath = await Object.values(csvs)[i];
        var obj = await startReq(url, csvPath);
    }
}
iterateItems(urls, csvs);
return;
async function startReq(url, csvPath) {
    console.log(url);

    https
        .get(url, (resp) => {
            let data = "";

            // A chunk of data has been received.
            resp.on("data", (chunk) => {
                data += chunk;
            });

            console.log(data);

            // The whole response has been received. Print out the result.
            resp.on("end", () => {
                let itemObj = JSON.parse(data);
                writeToCSV(itemObj, csvPath);
            });
        })
        .on("error", (err) => {
            console.log("Error: " + err.message);
        });
}

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