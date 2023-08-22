const { Pool } = require("pg");
const env = require("dotenv").config().parsed;

const pool = new Pool({
  host: `${env.host}`,
  port: `${env.port}`,
  user: `${env.user}`,
  password: `${env.password}`,
  database: `${env.database}`,
});

module.exports = pool;
