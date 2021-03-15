function currentDateTime() {
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
    console.log(timestamp);
    timestamp = new Date(timestamp).getTime();
    return timestamp;
}

module.exports = {
    currentDateTime: currentDateTime,
};