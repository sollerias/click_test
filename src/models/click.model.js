const clickhouse = require('./connect.model');
const { SERVICES } = require('../settings/folderPath');
const loggerFunction = require(`${SERVICES}/logger`);

const createClick = async (id, url, date) => {
  try {
    const queries = [
      `CREATE TABLE IF NOT EXISTS click
      (
          clickId String,
          url String,
          startDate Date
      )
      ENGINE = MergeTree()
      PARTITION BY toYYYYMMDDhhmmss(startDate)
      ORDER BY (startDate);`,

      `INSERT INTO click (*)
        VALUES ('${id}', '${url}', '${date}')`,
      `SELECT * FROM click`,
    ];

    for (const query of queries) {
      const r = await clickhouse.query(query).toPromise();

      console.log('models/click.model/query, r: \n', r);
    }
  } catch (e) {
    console.error('models/click/error: \n', e.stack);
    const logError = JSON.stringify(e.stack);
    loggerFunction('models/click', filePath, await statusAnswer(true, '00', logError), 'error');
  }
};

module.exports = createClick;

