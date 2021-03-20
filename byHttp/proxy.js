var cp = require("child_process"),
    exec = cp.exec,
    spawn = cp.spawn,
    tor = spawn("tor"),
    puts = function(err, stdo, stde) {
        console.log(stdo);
    },
    child;

async function sayIP() {
    child = await exec(
        "curl --proxy socks5h://localhost:9050 http://ifconfig.me",
        puts
    );

    dir = exec("curl ifconfig.me", function(err, stdout, stderr) {
        if (err) {
            console.log(err.message);
        }
        console.log(stdout);
    });

    dir.on("exit", function(code) {});
}

module.exports = sayIP;