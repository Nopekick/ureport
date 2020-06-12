const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
let route = process.env.PORT || 8081;

const authRoutes = require("./routes/auth")
const emailRoutes = require("./routes/email")
const adminRoutes = require("./routes/admin")
const schoolRoutes = require("./routes/school")

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

app.use("/api/auth", authRoutes)
app.use("/api/email", emailRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/school", schoolRoutes)

app.use(function(req, res, next){
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function errorHandler(error, req, res, next){
  return res.status(error.status || 500).json({
    error: {
      message: error.message || "Something went wrong."
    }
  })
})

app.listen(route, function(){
  console.log("Starting on port 8081")
})
