/**
 * File: clicker.js
 * -----------------
 * Catch the clicks.
 */
const express = require( 'express');
const loggerFunction = require('../services/logger');
const { statusAnswer } = require('../utils/helpers');
const chalk = require('chalk');
const filePath = __filename;
const router = express.Router();

/**
 * /login - обрабатывает данные, приходящие со страницы /login.
 * Производит аутентификацию пользователя. Добавляет в сессию параметры.
 * @param {integer} req.session.blocked - принимает значение 0 или 1.
 * Если параметр = 1, то на клиенте происходит блокировка экрана приложения.
 */
router.post('/login', async (req, res) => {
  // console.log('login client cookie: ', req.headers);
  // // console.log('req protocol: ', req.protocol);
  // // console.log('login req.body: ', req.body);
  // // console.log('login session.id 0: ', session.id);
  // const journalName = 'login';
  try {
    const {
      login,
      password,
    } = req.body;
    const userValidationData = await userClientValidation(login, password);

    if (userValidationData.error === false) {
      const userData = await getUser({
        login,
        password,
      });

      if (userData.error === false) {
        req.session.userId = userData.id;
        req.session.login = userData.login;
        req.session.password = userData.password;
        // statusAnswer(false, '00', 'OK', encodeData(userData));
        const answerToClient = await statusAnswer(false, '00', 'OK', await encodeData(userData));
        // return res.json(userData);
        return res.json(answerToClient);
      }
      loggerFunction('userValidationError', filePath, userData, 'warn');
      return res.json(userData);
    }

    loggerFunction('userValidationError', filePath, userValidationData, 'warn');
    return res.json(userValidationData);
  } catch (error) {
    loggerFunction('userCreditError', filePath, parseError(error), 'error');
    return res.status(400).send(parseError(error));
  }
});

/**
 * /main - обрабатывает данные, приходящие со страницы /main.
 * Отправляет клиенту все данные по пользователю из локального хранилища.
 */
router.post('/', async (req, res) => {
  console.log('req: ', req.body);
  loggerFunction('mainPageSuccess', filePath, await statusAnswer(false, '00', 'OK'), 'info');
  return res.json(await statusAnswer(false, '00', 'OK'));
});

module.exports = router;