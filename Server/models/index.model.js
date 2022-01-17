'use strict';

const databaseName = "cyclingfantacyteam" 

import pkg from 'pg';

const { Client } = pkg;
const DATABASE_URL = `postgres://@localhost:5432/${databaseName}`;

const client = new Client({
  connectionString: DATABASE_URL,
});

client.connect();

export default client;


