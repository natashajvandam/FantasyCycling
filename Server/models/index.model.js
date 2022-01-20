'use strict';

// const databaseName = "cyclingfantacyteam"

import pkg from 'pg';

const { Client } = pkg;
// const DATABASE_URL = `postgres://@localhost:5432/${databaseName}`;
const DATABASE_URL =
  'postgres://frphrmax:EVcF4G-94OsicdBuKzEIPaIEoMOHquD2@kandula.db.elephantsql.com/frphrmax';

const client = new Client({
  connectionString: DATABASE_URL,
});

client.connect();

export default client;
