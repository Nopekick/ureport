const jwt = require("jsonwebtoken")
const db = require("./models")

exports.jwtCheck = function(req, res, next){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, "swofjoidjskldjfl4349df9dfadvlkjslj9", (err, decoded) => {
      if (decoded) {
    console.log(decoded._id)
        db.User.findById(decoded._id).then((user)=>{
          console.log(user)
          if(user && user.emailValidated){
            next()
          } else {
            next({
              status: 404,
              message: "No authorization or User not found"
            })
          }
        }).catch((err)=>{
            next({
              status: 404,
              message: err.message
            })
        })
      }
      else {
        next({
          status: 404,
          message: "No authorization"
        })
      }
    })
  } else {
    next({
      status: 404,
      message: "No authorization"
    })
  }
}
