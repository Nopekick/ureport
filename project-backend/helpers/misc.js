const crypto = require("crypto")
const db = require("../models")

// let teachers = ["Andrea Aquino",
// "Claire Ballard",
// "Jill Buensuceso",
// "Esther Chen",
// "Tom Clark",
// "Karen Crump",
// "Jesus Del Real",
// "Jaz Dhillon",
// "Catherine Dietrich",
// "Kimberly Gavin",
// "Steve Guevara",
// "Leo Salcedo",
// "Alan Khan",
// "Eric Sato",
// "Christopher Lucas",
// "Jean Mastrogiacomo",
// "Nico Mendoza",
// "Kristin Moore",
// "Maria Murillo",
// "Vaishali Patil",
// "Liz Pettit",
// "Jessica Reid",
// "Katherine Poltorak",
// "Richard Prizznick",
// "Jemal Ramirez",
// "Laura Gordon Reska",
// "Ariana Rodriguez",
// "Loren Schwinge",
// "Nicole Sebek",
// "Sandra Trotch",
// "Aimee Verapinto",
// "Jessica Wall",
// "Anne Wustrow"]
//
// let teacheremails = ["aaquino@upatoday.com",
// "cballard@upatoday.com",
// "jbuensuceso@upatoday.com",
// "echen@upatoday.com",
// "tclark@upatoday.com",
// "kcrump@upatoday.com",
// "jdelreal@upatoday.com",
// "jdhillon@upatoday.com",
// "cdietrich@upatoday.com",
// "kgavin@upatoday.com",
// "sguevara@upatoday.com",
// "lsalcedo@upatoday.com",
// "akhan@upatoday.com",
// "esato@upatoday.com",
// "clucas@upatoday.com",
// "jmastrogiacomo@upatoday.com",
// "nmendoza@upatoday.com",
// "kmoore@upatoday.com",
// "mmurillo@upatoday.com",
// "vpatil@upatoday.com",
// "lpettit@upatoday.com",
// "jreid@upatoday.com",
// "kpoltorak@upatoday.com",
// "rprizznick@upatoday.com",
// "jramirez@upatoday.com",
// "lgordonreska@upatoday.com",
// "arodriguez@upatoday.com",
// "lschwinge@upatoday.com",
// "nsebek@upatoday.com",
// "strotch@upatoday.com",
// "averapinto@upatoday.com",
// "jwall@upatoday.com",
// "awustrow@upatoday.com"]
// db.School.findOne({name: "University Preparatory Academy"}).then((upa)=>{
//   console.log(upa)
//   for(let i = 0; i < teachers.length; i++){
//     let obj = {
//       name: teachers[i],
//       email: teacheremails[i],
//       school: upa._id
//     }
//     db.Teacher.create(obj).then((teacher)=>{
//       upa.teachers.push(teacher)
//
//     })
//
//   }
//   upa.save()
// })

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

  // This chunk below was commented out before hardcoding in Ms. nsebek
  // db.Teacher.find({school: req.params.id})
  // .then((teachers)=>{
  //   res.status(200).json(teachers)
  // }).catch((err)=>{
  //     next({message: err, status: 400})
  // })

  db.Teacher.find({email: 'nsebek@upatoday.com'})
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
