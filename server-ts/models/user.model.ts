'use strict';

import { QueryResult } from 'pg';
import client from './index.model.js';

const setNewUser = async (user: NewUser) => {
  const res: QueryResult = await client.query(`
    INSERT INTO user_table (email, nickname)
    VALUES ('${user.email}', '${user.nickname}')
    ON CONFLICT (nickname) DO NOTHING
    RETURNING *;`);
  return res.rows.length ? res.rows[0] : res;
};

const getUserDetails = async (nickname: string, email: string) => {
  const res: QueryResult = await client.query(
    `SELECT id, email, nickname, score, money FROM user_table WHERE nickname = '${nickname}' AND email = '${email}';`
  );
  console.log('model', res);
  return res.rows[0];
};

const getUserRoster = async (user: string) => {
  if (user) {
    const res: QueryResult = await client.query(
      `SELECT * FROM rider_table WHERE roster = ${user};`
    );
    return res.rows; //rows necessary for function reliant on it.
  }
};

const fetchAllRiders = async () => {
  const res: QueryResult = await client.query(
    `SELECT * FROM rider_table WHERE price > 10;`
  ); //temporary 'WHERE' statement to help load faster
  return res.rows;
};

const fetchAllUsers = async () => {
  const res: QueryResult = await client.query(`SELECT * FROM user_table;`);
  return res.rows;
};

export {
  getUserRoster,
  getUserDetails,
  setNewUser,
  fetchAllRiders,
  fetchAllUsers,
};
