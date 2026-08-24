const express = require("express");
const router = express.Router();

// console.log("Payment Routes Loaded");
const { capturePayment, verifyPayment } = require("../controllers/RazorPay");
const { auth, isStudent } = require("../middlewares/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);

// console.log("Payment Routes Loaded");

router.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.send("OK");
});


module.exports = router;    