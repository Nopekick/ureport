const crypto = require("crypto")
const db = require("../models")

exports.createHash = function(email){
  email = email + "secret393939"
  return crypto.createHash('sha1').update(`${email}`).digest('hex');
}

exports.getTeachers = function(req, res, next){
  // db.School.findById(req.params.id).populate('teachers' ).exec()
  // .then((school)=>{
  //   res.status(200).json(school)
  // }).catch((err)=>{
  //   console.log("error in 'get teachers' function")
  //     next({message: err, status: 400})
  // })

  // db.Teacher.find({school: req.params.id})
  // .then((teachers)=>{
  //   res.status(200).json(teachers)
  // }).catch((err)=>{
  //     next({message: err, status: 400})
  // })

  //won't work, taken out
  db.Teacher.find({email: ''})
  .then((teacher) => {
    res.status(200).json(teacher)
  }).catch((err)=>{
      next({message: err, status: 400})
  })
}

exports.getSchools = function(req, res, next){
  db.School.find({}).then((schools)=>{
    res.status(200).json({schools})
  }).catch((err)=>{
      next({message: err, status: 400})
  })
}
