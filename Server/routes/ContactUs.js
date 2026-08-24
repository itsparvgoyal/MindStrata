const express = require("express");
const {createReq} = require("../controllers/ContactUs");
const router = express.Router();

// console.log("contact us route hitted")

router.post("/" , createReq);
module.exports = router;