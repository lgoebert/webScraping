"use strict";
const fs = require("fs");
var items = require("../../config/item.json");

async function itemToFile(obj) {
  console.log("inside i2f: " + typeof obj);
  console.log("item:: " + obj);
  items["items"].push(obj);
  //console.log("here: " + items);
  let data = JSON.stringify(items);

  fs.writeFileSync("../../config/item.json", data, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("item written successfully.");
    }
  });
}

module.exports = itemToFile;
