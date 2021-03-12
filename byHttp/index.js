const startReq = require("./requestHandler");
const getFile = require("./filesHandler");
//const cutName = require("./filesHandler");

// vorraussetzung: Reihenfolge der items in itemsCSV.json muss gleich derer in items.json sein.
var myurls = require("./json/items.json");
var mycsvs = require("./json/itemsCSV.json");

async function iterateItems(urls, csvs) {
    var len = Object.keys(urls).length;
    for (var i = 0; i < len; i++) {
        console.log("-------------");
        let itemname = await Object.keys(urls)[i];
        itemname = await getFile(itemname);
        console.log("name: " + itemname);
        url = await Object.values(urls)[i];
        // csvPath = await Object.values(csvs)[i];
        console.log("###################" + itemname);
        await startReq(url, itemname);
    }
}

<<<<<<< HEAD
setInterval(iterateItems, 10000, urls, csvs);
=======
setInterval(iterateItems,2000000,myurls,mycsvs);

>>>>>>> 631ad334c5ba837d4ba31b042eae577ddebb1642
/*
    "Talon-Messer (★) | Damaszener Stahl MW": "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=%E2%98%85%20Talon%20Knife%20|%20Damascus%20Steel%20(Minimal%20Wear)",
        "FAMAS | Gedenkenfeier FT ": "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=FAMAS%20|%20Commemoration%20(Field-Tested)",
        "AK-47 | Blutsport MW": "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=AK-47%20|%20Bloodsport%20(Minimal%20Wear)",
        "Desert Eagle | Printstream FT": "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=Desert%20Eagle%20|%20Printstream%20(Field-Tested)",
        "USP-S | Bestätigter Abschuss FT": "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=USP-S%20|%20Kill%20Confirmed%20(Field-Tested)",
        "Glock-18 | Franklin FN": "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=Glock-18%20|%20Franklin%20(Factory%20New)",
        "M4A1-S | Printstream FT": "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=M4A1-S%20|%20Printstream%20(Field-Tested)"
*/