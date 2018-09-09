const express = require("express");
const router = express.Router();
const { sendReport, verify } = require("../helpers/email")
const { jwtCheck } = require("../authMiddleware")

router.post("/report", jwtCheck, sendReport)
router.get("/verify/:hash", verify)

module.exports = router;
