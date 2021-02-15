/**
 * File: clicker.js
 * -----------------
 * Catch the clicks.
 */
const express = require( 'express');
const { DateTime } = require('luxon');

const { statusAnswer } = require('../utils/helpers');
const processClick = require('../services/clicker.services');
const loggerFunction = require('../services/logger');

const filePath = __filename;
const router = express.Router();


/**
 *
 * Get click data.
 */
router.post('/', async (req, res) => {
  try {
    const { id, url } = req.body;
    const date = DateTime.now().toSQLDate();

    await processClick(id, url, date);

    const output = res.json(await statusAnswer(false, '00', 'OK'));
    loggerFunction('clickCreateSuccess', filePath, await statusAnswer(false, '00', output.toString()), 'info');

    return output;
  } catch (e) {
    const logError = JSON.stringify(e.stack);
    loggerFunction('apis/clicker/create', filePath, await statusAnswer(true, '00', logError), 'error');

    return res.status(500).end();
  }
});

module.exports = router;