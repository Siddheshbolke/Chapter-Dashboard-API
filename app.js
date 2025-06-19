const express = require('express');
const app = express();
const rateLimiter = require('./middlewares/rateLimiter');

require('dotenv').config();
require('./redisClient');

app.use(express.json());
app.use(rateLimiter);

const chapterRoutes = require('./routes/chapterRoutes');
app.use('/api/v1/chapters', chapterRoutes);

module.exports = app;
