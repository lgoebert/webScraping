// writefile.js

const fs = require('fs');
const utils = require("./utils");

let lyrics = 'fsdfafsaff';

let timestamp = utils.currentDateTime();
fs.writeFile('/tmp/MYtemp.txt', timestamp, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Timestamp saved!');
});
