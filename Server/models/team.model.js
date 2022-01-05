'use strict';

import client from './index.model.js';

const getUserRoster = async (user) => {
  const res = await client.query(`SELECT name FROM rider_table WHERE roster = ${user}`);
  return res.rows;
};

const setNewUser = async (user) => { 
  const res = await client.query(`
    INSERT INTO userTable (userName, teamName, password, score, date)
    VALUES (${user.name}, ${user.teamName}, ${user.password}, ${user.score}, ${Date.now()});
  `);
  return res.rows;
}

const addRiderToRoster = async (rider, user) => {
  const res = await client.query(`INSERT into riderTable ("userId") VALUES (${user}) WHERE riderId = ${rider};`);
  return res.rows;
};

const removeRiderFromRoster = async (rider, user) => {
  const res = await pool.query(`UPDATE riderTable WHERE riderId = ${rider} AND userId=${user} SET userId = 0;`);
  return res.rows;
};


export {getUserRoster, setNewUser, addRiderToRoster, removeRiderFromRoster}