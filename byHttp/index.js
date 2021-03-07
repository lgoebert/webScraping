const startReq = require("./requestHandler");

// vorraussetzung: Reihenfolge der items in itemsCSV.json muss gleich derer in items.json sein.
var urls = require("./json/items.json");
var csvs = require("./json/itemsCSV.json");

async function iterateItems(urls, csvs) {
    var len = Object.keys(urls).length;
    for (var i = 0; i < len; i++) {
        console.log("-------------");
        url = await Object.values(urls)[i];
        csvPath = await Object.values(csvs)[i];
        var obj = await startReq(url, csvPath);
    }
}

(function() {
    iterateItems(urls, csvs);
    setTimeout(arguments.callee, 600000);
})();