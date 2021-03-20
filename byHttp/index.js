const startReq = require("./requestHandler");
const getFile = require("./filesHandler");
const utils = require("./utils");
var urls_list = require("./json/items.json");
const proxy = require("./proxy");
console.log("Starting now");

// convert date to a string in UTC timezone format:
utils.currentDateTime();
setInterval(
    async function(urls) {
        // using tor proxy to spoof ip
        await proxy();
        var len = Object.keys(urls).length;
        for (var i = 0; i < len; i++) {
            console.log("-------------");
            let item_name = await Object.keys(urls)[i];
            item_name = await getFile(item_name);
            url = await Object.values(urls)[i];
            console.log("host: " + url.split("/")[2]);
            console.log("name: " + item_name);
            await startReq(url, item_name);
        }
    },
    1 * 3 * 1000,
    urls_list
);