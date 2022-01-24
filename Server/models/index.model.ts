// const databaseName = "cyclingfantacyteam"

import pkg from "pg";

const { Client } = pkg;
// const DATABASE_URL = `postgres://@localhost:5432/${databaseName}`;
const DATABASE_URL =
  "postgres://sogkqgly:obh0RJXY1MmzzU7WcJry9mpsslP_DxH_@tyke.db.elephantsql.com/sogkqgly";

const client = new Client({
  connectionString: DATABASE_URL,
});

client.connect();

export default client;
