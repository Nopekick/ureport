const express = require("express");
const router = express.Router();
const { getTeachers, getSchools } = require("../helpers/misc");

router.get("/:id", getTeachers)
router.get("/schools", getSchools)

module.exports = router;
