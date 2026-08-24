
const redisConnection = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,

    maxRetriesPerRequest: null,
    
    // ... ==> spread operator hai 
    // TLS ka kaam hai backend aur Redis ke beech connection ko encrypt karna.
    ...(process.env.REDIS_TLS === "true"
        ? {
            tls: {},
        }
        : {}),
};

module.exports = redisConnection;