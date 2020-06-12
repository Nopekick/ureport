const mongoose = require("mongoose")

mongoose.set('debug', true);
mongoose.Promise = Promise
mongoose.connect("",{ useNewUrlParser: true })

module.exports.User = require("./user")
module.exports.Message = require("./message")
module.exports.Teacher = require("./teacher")
module.exports.School = require("./school")
