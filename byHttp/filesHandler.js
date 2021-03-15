const fs = require("fs");
/**
 * converts the itemName into the fileName
 * Example: Desert Eagle | Printstream FT -> DesertEaglePrintstreamFT
 * @param {*} itemName name of the item
 */
function cutName(itemName) {
    itemName = itemName.replace(/[^a-zA-Z0-9]/g, "");
    itemName = itemName.replace(/\s/g, "");
    return itemName;
}

/**
 * Function which checks, if there is a csvFile for each item  in all_items.json
 * @param {*} fileName Name of the file, prevously put together in cutName()
 */
function createFile(itemName) {
    let columns = '"date","lowest_price","median_price","volume"';

    let path = "./plotting/files/" + cutName(itemName) + ".csv";
    console.log(path);

    if (fs.existsSync(path)) {
        console.log("exists");
    } else {
        //datei erstellen
        fs.writeFileSync(path, columns, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("ok. written");
            }
        });
    }
    return path;
}

/**
 * Examines, which file to use for a given item.
 * Example: If itemName == Desert Eagle | Printstream FT -> The file,
 * where values will be stored in is: DesertEaglePrintstreamFT.csv
 * @param {*} itemName name of the item, which the file should be found for.
 * @retunrns filename of the .csv file which it should be written into
 */
function getFile(itemName) {
    let path = createFile(itemName);
    console.log("####" + path);
    return path;
}

module.exports = getFile;