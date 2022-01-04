'use strict';

const databaseName = "cyclingfantacyteam" 

import pkg from 'pg';

const { Client } = pkg;
const DATABASE_URL = `postgres://@localhost:5432/${databaseName}`; // try adding : in case

const client = new Client({
  connectionString: DATABASE_URL,
});

client.connect();
//pool.once('open') //is there a way to check connected?

export default client;


