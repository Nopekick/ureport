const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  emailValidated: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  hash: {
    type:String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  hasBeenWarned: {
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', async function(next){
  try{
    if(!this.isModified("password")){
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword;
    return next();
  } catch(err){
      return next(err)
  }
})

userSchema.methods.comparePassword = async function(candidatePassword, next){
  try{
    let isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
  } catch(err){
    return next(err)
  }
}



module.exports = mongoose.model("User", userSchema)
