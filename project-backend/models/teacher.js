const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
  name: {
    type: String
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
  },
  email: {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model("Teacher", teacherSchema)
