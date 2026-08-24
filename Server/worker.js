require("dotenv").config();
const dbconnect = require("./config/database");

// Connect to MongoDB
dbconnect();

// Start the lecture summary worker
// summaryWorker pe job aane ka wait krega or processing krega 
require("./workers/summaryWorker");

console.log("Worker process initialized. Waiting for jobs...");