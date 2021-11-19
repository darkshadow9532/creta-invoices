const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongoosePaginate = require("mongoose-paginate-v2");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose, mongoosePaginate);
db.numberLists = require("./numberList.model.js")(mongoose, mongoosePaginate);
db.actions = require("./action.model.js")(mongoose);

module.exports = db;