const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimiterMemoryMiddleware = require('./services/middleware/rateLimiterMemory');


require('dotenv').config({ path: './src/config/dev_local.env' });
const clicker = require('./apis/clicker');

const app = express();
app.use(express.json({ extended: false }));
app.use(rateLimiterMemoryMiddleware);
app.use(helmet());
app.use(hpp());
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:3001',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use('/clicker', clicker);

module.exports = app;
