async function currentDateTime() {
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
    console.log(timestamp);
    timestamp = await new Date(timestamp).getTime();
    return timestamp;
}

function printStatus(url, name, path) {}
let url =
    "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=%E2%98%85%20Butterfly%20Knife%20|%20Case%20Hardened%20(Well-Worn)";

module.exports = {
    currentDateTime: currentDateTime,
};