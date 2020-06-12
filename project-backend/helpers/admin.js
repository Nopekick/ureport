const db = require("../models")

exports.banUser = function(req, res, next){
    db.User.findById(req.params.id).then((user)=>{
        user.isBanned = true;
        user.save()
        next({
          status: 200,
          message: "User successfully banned"
        })
      }).catch((err)=>{
          next({
            status: 404,
            message: err.message
          })
      })
}

// exports.findMessages =  function(req, res, next){
//   console.log("finding messages from warned users")
//   let messages = []
//   db.User.find({hasBeenWarned: true, isBanned: false})
//   .then( (users)=>{
//      users.forEach((user)=>{
//         db.Message.find({user: user._id})
//         .then((foundMessages)=>{
//           foundMessages.forEach((message)=>{
//             console.log(message)
//             messages.push(message)
//           })
//         }).catch((err)=>{
//             console.log(err)
//             next({status: 404,message: err.message})
//         })
//     })
//     console.log("about to resjason,", messages)
//       res.status(200).json({messages})
//   }).catch((err)=>{
//       next({message: err, status: 400})
//   })
// }

exports.findMessages =  async function(req, res, next){
  console.log("finding messages from warned users")
  let messages = []
  db.User.find({hasBeenWarned: true, isBanned: false})
  .then(async (users)=>{
    for(let i = 0; i < users.length; i++){
      await db.Message.find({user: users[i]._id})
      .then((foundMessages)=>{
        foundMessages.forEach((message)=>{
          console.log(message)
          messages.push(message)
        })
      }).catch((err)=>{
          console.log(err)
          next({status: 404,message: err.message})
      })
    }
    console.log("about to resjason,", messages)
      res.status(200).json({messages})
    }).catch((err)=>{
      next({message: err, status: 400})
  })
}

// exports.findMessages = async (req, res, next) => {
//   let messages = []
//   let result = await db.User.find({ hasBeenWarned: true, isBanned: false })
//   result.forEach(async ({ _id }) => {
//     let message = await db.Message.find({ user: _id })
//     messages.push(...message)
//   })
//   console.log(messages)
//   res.status(200).json({messages})
// }

exports.getMessage = function(req, res, next){
  db.Message.findById(req.params.id).populate('user').exec()
  .then((message)=>{
      res.status(200).json({message})
  }).catch((err)=>{
    next({message: err, status:400})
  })
}
