const db = require("../models");

const NumberList = db.numberLists;
const Action = db.actions;
const DeliveryStatus = db.deliveryStatuss;

const kiotApi = require("../../api/kiot.js");

const tools = require("../tools/other_tool");

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

    app.get("/invoices_old", function(req, res){
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

    app.get("/invoices", function(req, res){
        kiotApi.getKiotViet("https://public.kiotapi.com/invoices").then(invoices => {
            // console.log(invoices);
            tools.getInvoiceMetas(invoices.data).then(data => {
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
                DeliveryStatus.find({invoiceCode: data.code})
                .then( da => {
                    if (da.length == 0){
                        data.crDeliveryStatus = {
                            invoiceCode: data.code,
                            crDeliveryStatus: 1,
                            crDeliveryStatusText: "Mới lên đơn"
                        }
                    }
                    else {
                        data.crDeliveryStatus = da[0];
                    }                    
                    res.render("invoice-app/detail", {
                        invoice: data
                    })
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