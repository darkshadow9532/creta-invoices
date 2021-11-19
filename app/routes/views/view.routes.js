const db = require("../../models");

const NumberList = db.numberLists;
const Action = db.actions;

const kiotApi = require("../../../api/kiot.js");

const tools = require("../../tools/other_tool");

var test = [
    {
        "id": 57730529,
        "uuid": "W163730909650738",
        "code": "HD005432.01",
        "purchaseDate": "2021-11-19T15:01:00.3270000",
        "branchId": 12961,
        "branchName": "Chi nhánh trung tâm",
        "soldById": 31767,
        "soldByName": "Nguyễn Huy",
        "customerId": 3206657,
        "customerCode": "KH000341",
        "customerName": "anh Hậu (Phú Nhuận)",
        "orderCode": "",
        "total": 780000,
        "totalPayment": 0,
        "discount": 0,
        "status": 3,
        "statusValue": "Đang xử lý",
        "description": "Giao sớm cho khách",
        "usingCod": true,
        "createdDate": "2021-11-19T15:04:57.1030000",
        "invoiceDetails": [
            {
                "productId": 1301957,
                "productCode": "SP000033",
                "productName": "Nguồn tổ ong 12V-30A",
                "quantity": 3,
                "price": 260000,
                "discount": 0,
                "usePoint": true,
                "subTotal": 780000,
                "serialNumbers": "",
                "returnQuantity": 0
            }
        ]
    },
    {
        "id": 57641591,
        "uuid": "W163722426933139",
        "code": "HD005426",
        "purchaseDate": "2021-11-18T15:31:08.8170000",
        "branchId": 12961,
        "branchName": "Chi nhánh trung tâm",
        "soldById": 31767,
        "soldByName": "Nguyễn Huy",
        "customerId": 2657311,
        "customerCode": "KH000281",
        "customerName": "anh Thành (Kiên Giang)",
        "orderCode": "",
        "total": 5350000,
        "totalPayment": 0,
        "status": 3,
        "statusValue": "Đang xử lý",
        "usingCod": true,
        "createdDate": "2021-11-18T15:31:08.8970000",
        "invoiceDetails": [
            {
                "productId": 1461751,
                "productCode": "SP000124",
                "productName": "Cáp mạng VCOM CAT6 - UTP- PVC - 305m",
                "quantity": 2,
                "price": 2737000,
                "discount": 187000,
                "usePoint": true,
                "subTotal": 5100000,
                "serialNumbers": "",
                "returnQuantity": 0
            },
            {
                "productId": 1302023,
                "productCode": "SP000099",
                "productName": "Cáp HDMI 1.4 - dẹt - 1,5m",
                "quantity": 10,
                "price": 25000,
                "discount": 0,
                "usePoint": true,
                "subTotal": 250000,
                "serialNumbers": "",
                "returnQuantity": 0
            }
        ]
    }
]
module.exports = app => {
    
    // var router = require("express").Router();
  
    app.get("/numberList/show", function(req, res){
        NumberList.find().then(data => {
            res.render("show", {
                data: data
            });
        }).catch(err => {
            res.render("show", {
                data: []
            });
        });
    })

    app.get("/numberList/create", function(req, res){
        res.render("create");
    })

    app.get("/numberList/edit/:id", function(req, res){
        res.render("edit", {
            id: req.params.id
        });
    })

    app.get("/invoices", function(req, res){
        kiotApi.getKiotViet("https://public.kiotapi.com/invoices").then(invoices => {
            // console.log(invoices);
            tools.getInvoiceActions(invoices.data).then(data => {
                // console.log(data);
                invoices.data = data;
                res.render("invoice-app/show", {
                    invoices: invoices
                })
            });
            
        })
        .catch(err => {
            res.render("invoice-app/show", {
                invoices: {}
            }) 
        });
    })

    app.get("/invoices/detail/:id", function(req, res){
        kiotApi.getKiotViet("https://public.kiotapi.com/invoices/" + req.params.id).then(data => {
            Action.find({invoiceCode: data.code })
            .then( d => {
                data.actions = d;
                res.render("invoice-app/detail", {
                    invoice: data
                })
            })
            // console.log(invoices);
            // res.render("invoice-app/detail", {
            //     invoice: data
            // })
        })
        .catch(err => {
            res.render("invoice-app/detail", {
                invoice: {}
            }) 
        });
    })

    app.get("/invoices/image/:id", function(req, res){

        kiotApi.getKiotViet("https://public.kiotapi.com/products/" + req.params.id).then(data => {
            // console.log("Hello");
            res.render("invoice-app/image", {
                product: data
            })
        })
        .catch(err => {
            res.render("invoice-app/image", {
                product: {}
            }) 
        });
    })

    app.get("/invoices/sms/:id", function(req, res){
        kiotApi.getKiotViet("https://public.kiotapi.com/invoices/" + req.params.id).then(data => {
            // console.log(invoices);
            res.render("invoice-app/sms", {
                invoice: data
            })
        })
        .catch(err => {
            res.render("invoice-app/sms", {
                invoice: {}
            }) 
        });
    })

    // app.use('', router);
  };