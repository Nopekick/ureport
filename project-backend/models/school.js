const mongoose = require("mongoose")

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  address: {
    type: String,
    unique: true
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }]
})

module.exports = mongoose.model("School", schoolSchema)
