const j2csv = require("json2csv").parse;
const csv2j = require("csvtojson");
const fs = require("fs");

async function convertToCsv(obj) {
  csv2j()
    .fromFile("./mycsv.csv") // get current file as json
    .then((source) => {
      source.push(obj); // add new object to it
      console.log(source);

      const csv = j2csv(source, { fields: ["name", "alter", "ort"] });
      fs.writeFileSync("./mycsv.csv", csv);
    });
}

module.exports = convertToCsv;
