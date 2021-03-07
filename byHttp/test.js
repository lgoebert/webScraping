const https = require("https");
const items = require("./json/items.json");

var name = "";
var time = "";
var ms = "";
var date = "";

https
    .get(
        "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=%E2%98%85%20Butterfly%20Knife%20|%20Case%20Hardened%20(Well-Worn)",
        (resp) => {
            let data = "";
            console.log("currently: ");
            console.log(url);
            // A chunk of data has been received.
            resp.on("data", (chunk) => {
                data += chunk;
            });
            console.log("**+++++++++++++++++**");
            await console.log(data);

            // The whole response has been received. Print out the result.
            resp.on("end", () => {
                console.log(typeof data);
                data = JSON.parse(data);
                console.log(typeof data);
                time = data.time;
                ms = data.milliseconds_since_epoch;
                date = data.date;

                console.log(time);
                console.log(date);
                console.log(ms);
            });
        }
    )
    .on("error", (err) => {
        console.log("Error: " + err.message);
    });