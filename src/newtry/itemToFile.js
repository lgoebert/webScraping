"use strict";
const fs = require("fs");

async function itemToFile(obj) {
  //console.log("inside i2f: " + typeof obj);
  //console.log("item:: " + obj);
  //  items.push(obj);
  //console.log("here: " + items);

  let data = JSON.stringify(obj);
  fs.writeFileSync("../../config/items.json", data, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("item written successfully.");
    }
  });
}

module.exports = itemToFile;
