/**
 * File: helpers.js
 * -----------------
 * Заданы вспомогательные функции.
 */

const {
  statusAnswerValidation,
} = require('../services/validations/helpers');


/**
 * statusAnswer() - возвращает клиенту подготовленный объект с данными
 * по запросу .
 * @param {boolean} error - наличие ошибки в запросе от клиента
 * @param {string} status - статус ошибки или статус 00 - запрос выполнен
 * @param {string} text - текст ошибки или ОК - запрос выполнен
 * @param {multiple} value - различного рода данные
 */
const statusAnswer = async (error, status, text, value = null) => {
  const validation = await statusAnswerValidation(error, status, text, value);

  return validation;
};

module.exports = {
  statusAnswer,
};
