const Redis = require('ioredis');
const redis = new Redis(); // Connect to default localhost:6379
module.exports = redis;
