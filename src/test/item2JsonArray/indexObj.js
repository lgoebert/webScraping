const items = require("../../../config/item.json");

//console.log(items);
//console.log(items["items"][1]);

var myobj = {
  name: "",
  alter: "",
  ort: "",
};
for (let i = 0; i < 3; i++) {
  myobj[Object.keys(myobj)[i]] = i;
}
console.log(myobj);

console.log(myobj[Object.keys(myobj)[0]]);
console.log(myobj);
myobj[Object.keys(myobj)[1]];
myobj[Object.keys(myobj)[1]] = 5455;
console.log(Object.keys(myobj));
console.log(myobj);
