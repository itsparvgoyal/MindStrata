// bullMQ ek popular job queue system hai jo Node.js applications mein heavy ya long-running tasks ko background mein process karne ke kaam aata hai. 
// Yeh Redis ko message broker ke taur par use karta hai.
const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

// worker ko bhi exact same queue name dena padega. 🚨
const summaryQueue = new Queue("lecture-summary", {
    connection: redisConnection,

    defaultJobOptions: {
        attempts: 3,
        
        // Retry immediately mat karo; thoda wait karke retry karo. exponential --> har fail ke bech me delay progressively increase kro 
        backoff: {
            type: "exponential",
            delay: 10000,
        },

        removeOnComplete: {
            age: 24 * 60 * 60,
            count: 1000,
        },
        
        // failed jobs - debugging me kaam aa skti hai apne , toh isko thode jayda din rakhenge queue me (7 day)
        removeOnFail: {
            age: 7 * 24 * 60 * 60,
            count: 5000,
        },
    },
});

module.exports = summaryQueue;