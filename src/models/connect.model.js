const { ClickHouse } = require('clickhouse');

const clickhouse = new ClickHouse({
  url: 'http://localhost',
  port: 8123,
  debug: true,
  basicAuth: null,
  isUseGzip: false,
  format: "json", // "json" || "csv" || "tsv"
  config: {
    output_format_json_quote_64bit_integers : 0,
    enable_http_compression                 : 0,
    database                                : 'clicker',
  },
});

module.exports = clickhouse;