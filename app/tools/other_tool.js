const db = require("../models");
const Action = db.actions;
const DeliveryStatus = db.deliveryStatuss;

async function getInvoiceActions(ivs){
    var invoices = ivs;
    // console.log(invoices);
    var length = invoices.length;
    var loop = 0;
    for await( invoice of invoices){
        try{
            var data = await Action.find({invoiceCode: invoice.code})
            invoice.actions = data;
            loop++;
            if(loop === length){
                console.log("done1");
                // return invoices;
            }
        }        
        catch(err){
            invoice.actions = [];
            loop++;
            if(loop === length){
                console.log("done1");
                // return invoices;
            }
        }
    }
    return invoices;
}


async function getInvoiceDeliveryStatus(ivs){
    var invoices = ivs;
    // console.log(invoices);
    var length = invoices.length;
    var loop = 0;
    for await( invoice of invoices){
        try{
            var data = await DeliveryStatus.find({invoiceCode: invoice.code})
            
            invoice.crDeliveryStatus = data[0]? data[0] : {
                invoiceCode: invoice.code,
                crDeliveryStatus: 1,
                crDeliveryStatusText: "Mới lên đơn"
            };
            loop++;
            if(loop === length){
                console.log("done1");
                // return invoices;
            }
        }        
        catch(err){
            invoice.crDeliveryStatus = {
                invoiceCode: invoice.code,
                crDeliveryStatus: 1,
                crDeliveryStatusText: "Mới lên đơn"
            };
            loop++;
            if(loop === length){
                console.log("done1");
                // return invoices;
            }
        }
    }
    // console.log(invoices);
    return invoices;
}

async function getInvoiceMetas(ivs){
    var i1 = await getInvoiceActions(ivs);
    // console.log(i1);
    var i2 = await getInvoiceDeliveryStatus(i1);
    // console.log(i2);
    return i2;
}

module.exports.getInvoiceActions = getInvoiceActions;

module.exports.getInvoiceMetas = getInvoiceMetas;