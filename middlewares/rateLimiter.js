const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redisClient = require('../redisClient');

module.exports = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redisClient.call(...args) }),
  windowMs: 60 * 1000,
  max: 30,
  keyGenerator: (req) => req.ip,
  message: 'Too many requests. Please try again later.'
});
