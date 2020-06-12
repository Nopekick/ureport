const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  school: {
    type: String
  },
  problem: {
    type: String
  },
  message: {
    type: String
  },
  recipientName: {
    type: String
  },
  recipientEmail: {
    type: String
  },
  dateSent: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Message", messageSchema)
