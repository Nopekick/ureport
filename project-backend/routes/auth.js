const express = require("express");
const router = express.Router();
const { signin, signup} = require("../helpers/auth");
const {jwtCheck} = require("../authMiddleware")

router.post("/login", signin)
router.post("/signup", signup)

module.exports = router;
