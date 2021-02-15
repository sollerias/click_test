/**
 * File: folderPath.js
 * -----------------
 * Прописаны пути к необходимым файлам.
 */
const { join } = require('path');

const CORE = join(`${__dirname}/../`);
const APIS = join(`${__dirname}/../apis`);
const INTERFACES = join(`${__dirname}/../interfaces`);
const MODELS = join(`${__dirname}/../models`);
const SERVICES = join(`${__dirname}/../services`);
const LOG = join(`${__dirname}/../log`);
const DB = join(`${__dirname}/../database`);
const UTILS = join(`${__dirname}/../utils`);

module.exports = {
  LOG,
  CORE,
  MODELS,
  SERVICES,
  UTILS,
};