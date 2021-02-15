const fs = require('fs');
const { MODELS, SERVICES, UTILS } = require('../settings/folderPath');
const createClick = require(`${MODELS}/click.model`);
const loggerFunction = require(`${SERVICES}/logger`);
const { statusAnswer } = require(`${UTILS}/helpers`);

const filePath = __filename;

const processClick = async (id, url, date) => {
  try {
    createClick(id, url, date);
    const output = {
      isError: false,
      text: 'Click successfully saved'
    }

    return output;
  } catch (e) {
    console.error('services/clicker/processClick/error: \n', e.stack);
    const logError = JSON.stringify(e.stack);
    loggerFunction('services/clicker/processClick', filePath, await statusAnswer(true, '00', logError), 'error');
  }
};

module.exports = processClick;