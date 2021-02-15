/**
 * File: helpers.js
 * -----------------
 * Валидирует данные файла src/utils/helpers.js.
 */
const Joi = require('@hapi/joi');
const loggerFunction = require ('../logger');

const filePath = __filename;

/**
 * statusAnswerValidation() - валидирует функцию statusAnswer()
 * @param {boolean} error - есть ошибка или нет
 * @param {string} status - статус ответа
 * @param {string} text - текст ответа
 * @param {multiple} value - данные ответа (если есть)
 */
const statusAnswerValidation = async (error, status, text, value) => {
  const schema = Joi.object({
    error: Joi.boolean()
      .required(),

    status: Joi.string()
      .required(),

    text: Joi.string()
      .required(),

    value: Joi.alternatives().try(Joi.string(), Joi.object(), Joi.array()).allow(null),
  });

  try {
    const result = await schema.validateAsync({
      error, status, text, value,
    });

    return result;
  } catch (err) {
    const logInfo = JSON.stringify({ catchError: err.stack });
    loggerFunction('statusAnswerValidation', filePath, logInfo, 'warn');

    return { catchError: err.details };
  }
};

module.exports = {
  statusAnswerValidation,
};
