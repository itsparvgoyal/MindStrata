require("dotenv").config();
const dbconnect = require("./config/database");

// Connect to MongoDB
dbconnect();

app.get("/", (req, res) => {
    res.status(200).send("Worker is running");
});

const PORT = 10000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Worker health server running on port ${PORT}`);
});

// Start the lecture summary worker
// summaryWorker pe job aane ka wait krega or processing krega 
require("./workers/summaryWorker");

console.log("Worker process initialized. Waiting for jobs...");