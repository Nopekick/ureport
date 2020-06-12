const express = require("express");
const router = express.Router();
const {adminCheck} = require("../authMiddleware")
const {findMessages, banUser, getMessage} = require("../helpers/admin")

router.get("/messages", adminCheck, findMessages)
router.get("/message/:id", adminCheck, getMessage)
router.post("/ban/:id", adminCheck, banUser)

module.exports = router;
