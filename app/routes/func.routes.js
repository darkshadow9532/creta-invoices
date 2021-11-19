

module.exports = app => {
    const funcs = require("../controllers/func.controller.js");

    app.get("/funcs/sendSMS", funcs.sendSMS);
};