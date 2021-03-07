const fs = require("fs");
const http = require("http");
var url = require("url");

const port = 8080;

function printInput(text) {
    console.log(text);
}

const server = http
    .createServer((req, res) => {
        var path = url.parse(req.url).pathname;
        var params = path.split("/");
        var actualPath = params[1];

        if (actualPath == "skins") {
            if (req.method == "GET") {
                console.log("get");
                fs.readFile("./index.html", (err, html) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("write");
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(html);
                });
            }
        }
    })
    .listen(port);