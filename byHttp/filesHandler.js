/**
 * converts the itemName into the fileName
 * Example: Desert Eagle | Printstream FT -> DesertEaglePrintstreamFT
 * @param {*} itemName name of the item
 */
function cutName(itemName) {
  itemName = itemName.replace(/[^a-zA-Z ]/g, "");
  itemName = itemName.replace(/\s/g, "");
  console.log(itemName);
}
cutName("★ Butterfly Knife | Case Hardened");
/**
 * Function which checks, if there is a csvFile for each item  in all_items.json
 * @param {*} fileName Name of the file, prevously put together in cutName()
 */
function createFile(fileName) {}

/**
 * Examines, which file to use for a given item.
 * Example: If itemName == Desert Eagle | Printstream FT -> The file,
 * where values will be stored in is: DesertEaglePrintstreamFT.csv
 * @param {*} itemName name of the item, which the file should be found for.
 * @retunrns filename of the .csv file which it should be written into
 */
function getFile(itemName) {}
