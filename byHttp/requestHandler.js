const https = require("https");
const writeToCSV = require("./writeToFile");

async function startReq(url, csvPath) {
    console.log(url);

    https
        .get(url, (resp) => {
            console.log("-----------");
            console.log(resp.statusCode);
            console.log(resp.headers);
            console.log(url);
            console.log("-----------");
            return;
            let data = "";

            // A chunk of data has been received.
            resp.on("data", (chunk) => {
                data += chunk;
            });
            console.log(":....:");
            console.log(data);
            // The whole response has been received. Print out the result.
            resp.on("end", () => {
                if (data != null || data != undefined || data == "") {
                    try {
                        let itemObj = JSON.parse(data);
                        writeToCSV(itemObj, csvPath);
                    } catch (error) {
                        console.error(error.message);
                    }
                } else {
                    console.log(">>> data null or undefined");
                    console.log(typeof data);
                }
            });
        })
        .on("error", (err) => {
            console.log("Error: " + err.message);
        });
}

module.exports = startReq;