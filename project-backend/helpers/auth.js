const jwt = require('jsonwebtoken');
const db = require('../models');

const { createHash } = require("./misc")
const { sendVerification } = require("./email")

exports.signin = async function(req, res, next){
  try{
    let user = await db.User.findOne({email: req.body.email});
    let {_id, email, isAdmin, school} = user
    let isMatch = await user.comparePassword(req.body.password)

    if(isMatch){
      let token = jwt.sign({_id,email,isAdmin,school},"tsdlkfjslkjewlkjf458u09fdvfvdg90efnlkndslkvndflv9")
      return res.status(200).json({
        token
      })
    } else{
      return next({status: 400, message: "Invalid email or password"})
    }
  } catch(e){
    return next({status: 400, message: "Invalid email or password"})
  }

}

exports.signup = async function(req, res, next){
  try{
    const hash = createHash(req.body.email)
    req.body.hash = hash
    let user = await db.User.create(req.body)
    let {_id, email, isAdmin, school} = user
    let token = jwt.sign({_id,email,isAdmin, school}, "tsdlkfjslkjewlkjf458u09fdvfvdg90efnlkndslkvndflv9")

    await sendVerification(user.email, user.hash, user.fname, user.lname)
    return res.status(200).json({token})
  } catch(err){
      if(err.code === 11000){
        err.message = "Sorry, that username and/or email is taken"
      }
      return next({
        status: 400,
        message: err.message
      })
  }
}
