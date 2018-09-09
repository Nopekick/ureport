const jwt = require('jsonwebtoken');
const db = require('../models');

const { createHash } = require("./misc")
const { sendVerification } = require("./email")

exports.signin = async function(req, res, next){
  try{
    let user = await db.User.findOne({email: req.body.email});
    let {_id, email} = user
    let isMatch = await user.comparePassword(req.body.password)

    if(isMatch){
      let token = jwt.sign({_id,email},"swofjoidjskldjfl4349df9dfadvlkjslj9")
      return res.status(200).json({
        _id,
        email,
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
    console.log(req.body)
    const hash = createHash(req.body.email)
    console.log(hash)
    req.body.hash = hash
    let user = await db.User.create(req.body)
    console.log('created user');
    let {_id, email} = user
    let token = jwt.sign({_id,email}, "swofjoidjskldjfl4349df9dfadvlkjslj9")

    await sendVerification(user.email, user.hash)
    return res.status(200).json({
      token
    })
  } catch(err){
      console.log(err);
      if(err.code === 11000){
        err.message = "Sorry, that username and/or email is taken"
      }
      return next({
        status: 400,
        message: err.message
      })
  }
}
