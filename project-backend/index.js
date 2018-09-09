const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const emailRoutes = require("./routes/email")

app.use(bodyParser.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/email", emailRoutes)

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

app.listen(8081, function(){
  console.log("Starting on port 8081")
})
