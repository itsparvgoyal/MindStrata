const express = require("express");
const {generateSummary} = require("../controllers/LectureSummary");
const router = express.Router();

router.post(
    "/generate-summary",
    generateSummary
);

module.exports = router;