const dbConfig = require("../config/db.config.js");

console.log('dbConfig = ', dbConfig)

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.connString = dbConfig.connString;
db.users = require("./users.model.js")(mongoose);
db.message = require("./message.model.js")(mongoose);
db.nftMetadata = require("./nftMetadata.model.js")(mongoose);
db.registeration = require("./registeration.model.js")(mongoose);

module.exports = db;