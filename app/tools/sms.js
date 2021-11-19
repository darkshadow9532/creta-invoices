var fetch = require("node-fetch");
const phpUrl = "http://data.creta.work/creta/action/playsms/send_sms.php";
async function sendSmsPHPServer(to, msg){
    url = phpUrl + "?to=" + to + "&msg=" + msg;
    // console.log(url);
    try {
        var res = await fetch(url);
        var data = await res.text();
        console.log("Data:",data);
        return data;
    }
    catch (error) {
        console.log(error);
        return "ERROR";
    }
}

async function sendTest(to, msg){
    return "OK";
}

// async function test(){
//     console.log( await sendSmsPHPServer("0333388917", "HelloMh"));
// }

// test();

module.exports.sendSmsPHPServer = sendSmsPHPServer;