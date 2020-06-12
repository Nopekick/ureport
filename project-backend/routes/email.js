const express = require("express");
const router = express.Router();
const { sendReport, verify, sendWarning } = require("../helpers/email")
const { jwtCheck, eligibleCheck, getEligibility } = require("../authMiddleware")

router.post("/report", jwtCheck, eligibleCheck, sendReport)
router.get("/verify/:hash", verify)
router.get("/warning/:hash", sendWarning)
router.get("/checkeligible", getEligibility)

module.exports = router;
