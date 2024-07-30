const dotenv = require("dotenv");
const { MONGO_URI_kEY } = require("./constants")
dotenv.config();
const MONGO_URI = process.env[MONGO_URI_kEY]

module.exports = {
    MONGO_URI,

}