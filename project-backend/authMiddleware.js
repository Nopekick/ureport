const jwt = require("jsonwebtoken")
const db = require("./models")

exports.jwtCheck = function(req, res, next){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, "tsdlkfjslkjewlkjf458u09fdvfvdg90efnlkndslkvndflv9", (err, decoded) => {
      if (decoded) {
        db.User.findById(decoded._id).then((user)=>{
          if(user && user.emailValidated){
            next()
          } else {
            next({
              status: 401,
              message: "No authorization or User not found"
            })
          }
        }).catch((err)=>{
            next({
              status: 401,
              message: err.message
            })
        })
      }
      else {
        next({
          status: 401,
          message: "No authorization"
        })
      }
    })
  } else {
    next({
      status: 401,
      message: "No authorization"
    })
  }
}

exports.adminCheck = function(req, res, next){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, "tsdlkfjslkjewlkjf458u09fdvfvdg90efnlkndslkvndflv9", (err, decoded) => {
      if (decoded) {
        db.User.findById(decoded._id).then((user)=>{
          if(user && user.isAdmin===true){
            next()
          } else {
            next({
              status: 401,
              message: "No authorization"
            })
          }
        }).catch((err)=>{
            next({
              status: 401,
              message: err.message
            })
        })
      }
      else {
        next({
          status: 401,
          message: "No authorization"
        })
      }
    })
  } else {
    next({
      status: 401,
      message: "No authorization"
    })
  }
}

exports.eligibleCheck = async function(req, res, next){
  try {
    let token = jwt.decode(req.headers.authorization.split(' ')[1])
    let user = await db.User.findById(token._id)
    const dateDiff = parseInt((Date.now() - user.date) / (1000 * 60 * 60));
    if(!user.isBanned && dateDiff >= 24 && user.emailValidated){
      return next()
    } else {
      next({
        status: 401,
        message: "The user is unable to report at this time. Either they are on a cooldown or the user is banned."
      })
    }
  } catch(e) {
    console.log(e)
    next({
      status: 401,
      message: "Error with eligilibity"
    })
  }

}

exports.getEligibility = async function(req, res, next){
  try{
    let token = jwt.decode(req.headers.authorization.split(' ')[1])
    let user = await db.User.findById(token._id)
    const dateDiff = parseInt((Date.now() - user.date) / (1000 * 60 * 60));
    let obj = {
      emailValidated: user.emailValidated,
      isBanned: user.isBanned,
      timeDiff: dateDiff,
      isWarned: user.hasBeenWarned,
      name: user.fname
    }
    res.status(200).json({obj})
  } catch(e){
    console.log(e)
    next({
      status: 400,
      message: "Error with eligilibity lookup"
    })
  }
}
