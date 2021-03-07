"use strict";
const fs = require("fs");
var items = require("../../../config/item.json");

var obj = {
  name: "hans",
  alter: "33",
  ort: "hofen",
};

async function abc(obj) {
  console.log("items: " + items["items"]);

  var data = JSON.stringify(items);

  fs.writeFileSync("../../../config/item.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
  console.log(items);
}
abc(obj);
console.log(items);
