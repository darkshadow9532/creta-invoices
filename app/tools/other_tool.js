const db = require("../models");
const Action = db.actions;
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
    // invoices.forEach(invoice => {       
    //     console.log(invoice.code); 
    //     Action.find({invoiceCode: invoice.code})
    //     .then(data => {           
    //         invoice.actions = data;
            
    //         loop++;
    //         if(loop === length){
    //             console.log("done1");
    //             // return invoices;
    //         }
    //     }).catch(err => {
    //         invoice.actions = [];
            
    //         loop++;
    //         if(loop === length){
    //             console.log("done2");
    //             // return invoices;
    //         }
    //     })
    // })

}
module.exports.getInvoiceActions = getInvoiceActions;
// getInvoiceActions([
//     {
//         "id": 57730529,
//         "uuid": "W163730909650738",
//         "code": "HD005432.01",
//         "purchaseDate": "2021-11-19T15:01:00.3270000",
//         "branchId": 12961,
//         "branchName": "Chi nhánh trung tâm",
//         "soldById": 31767,
//         "soldByName": "Nguyễn Huy",
//         "customerId": 3206657,
//         "customerCode": "KH000341",
//         "customerName": "anh Hậu (Phú Nhuận)",
//         "orderCode": "",
//         "total": 780000,
//         "totalPayment": 0,
//         "discount": 0,
//         "status": 3,
//         "statusValue": "Đang xử lý",
//         "description": "Giao sớm cho khách",
//         "usingCod": true,
//         "createdDate": "2021-11-19T15:04:57.1030000",
//         "invoiceDetails": [
//             {
//                 "productId": 1301957,
//                 "productCode": "SP000033",
//                 "productName": "Nguồn tổ ong 12V-30A",
//                 "quantity": 3,
//                 "price": 260000,
//                 "discount": 0,
//                 "usePoint": true,
//                 "subTotal": 780000,
//                 "serialNumbers": "",
//                 "returnQuantity": 0
//             }
//         ]
//     },
//     {
//         "id": 57641591,
//         "uuid": "W163722426933139",
//         "code": "HD005426",
//         "purchaseDate": "2021-11-18T15:31:08.8170000",
//         "branchId": 12961,
//         "branchName": "Chi nhánh trung tâm",
//         "soldById": 31767,
//         "soldByName": "Nguyễn Huy",
//         "customerId": 2657311,
//         "customerCode": "KH000281",
//         "customerName": "anh Thành (Kiên Giang)",
//         "orderCode": "",
//         "total": 5350000,
//         "totalPayment": 0,
//         "status": 3,
//         "statusValue": "Đang xử lý",
//         "usingCod": true,
//         "createdDate": "2021-11-18T15:31:08.8970000",
//         "invoiceDetails": [
//             {
//                 "productId": 1461751,
//                 "productCode": "SP000124",
//                 "productName": "Cáp mạng VCOM CAT6 - UTP- PVC - 305m",
//                 "quantity": 2,
//                 "price": 2737000,
//                 "discount": 187000,
//                 "usePoint": true,
//                 "subTotal": 5100000,
//                 "serialNumbers": "",
//                 "returnQuantity": 0
//             },
//             {
//                 "productId": 1302023,
//                 "productCode": "SP000099",
//                 "productName": "Cáp HDMI 1.4 - dẹt - 1,5m",
//                 "quantity": 10,
//                 "price": 25000,
//                 "discount": 0,
//                 "usePoint": true,
//                 "subTotal": 250000,
//                 "serialNumbers": "",
//                 "returnQuantity": 0
//             }
//         ]
//     }
// ]).then(data => {
//     console.log(data);
// }).catch( err =>{
//     console.log(err);
// })