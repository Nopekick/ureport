const mongoose = require("mongoose")

mongoose.set('debug', true);
mongoose.Promise = Promise
mongoose.connect("mongodb://hackuser:reactwin2@ds251022.mlab.com:51022/srchacks")

module.exports.User = require("./user")
