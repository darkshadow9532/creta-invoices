// var fetch = require("node-fetch");
// const phpUrl = "http://data.creta.work/creta/action/playsms/send_sms.php";

// async function sendSmsPHPServer(to, msg){
//     url = phpUrl + "?to=" + to + "&msg=" + msg;
//     console.log(url);
//     try {
//         var res = await fetch(url);
//         var data = await res.json();
//         console.log("Data:",data);
//         return data;
//     }
//     catch (error) {
//         console.log(error);
//         return "ERROR";
//     }
//     // var res = await fetch(url);
//     // var data = await res.json();
//     // return data;
    
// }
var sms = require("../tools/sms");
const db = require("../models");
const Action = db.actions;

exports.sendSMS = (req, res) => {
    // console.log(req.query);
    if(!req.query.to || !req.query.msg || !req.query.invoiceCode || !req.query.actionName){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    sms.sendSmsPHPServer(req.query.to, req.query.msg)
    .then(data => {
        if(data == "OK"){
            var action = new Action({
                invoiceCode: req.query.invoiceCode,
                actionName: req.query.actionName,
                actionStatus: "OK",
                actionData: {}
            })
            action
                .save(action)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    // console.log(err);
                    res.status(500).send({
                    message: "Some error occurred while creating the Action."
                    });
                });

        }
        else {
            res.status(500).send({
                message: "Some error occurred while creating the Action."
            }); 
        }
    })

}