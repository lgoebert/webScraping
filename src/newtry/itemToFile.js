"use strict";
const fs = require("fs");
const { deprecate } = require("util");
/**
 * !! This method is currently not being used, but remains here for possible future purposes
 *
 * Writes JS-Objects into JSON file, to store them.
 * @param {*} obj Object to stringify and write to file.
 */
async function itemToFile(obj) {
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
