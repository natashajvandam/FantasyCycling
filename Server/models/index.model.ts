"use strict";
import "dotenv/config";
import pkg from "pg";

const { Client } = pkg;
const DATABASE_URL: string = process.env.DATABASE_URI;

const client = new Client({
  connectionString: DATABASE_URL,
});

client.connect();

export default client;
