'use strict';

import client from './index.model.js';

const setNewUser = async (user) => { 
  const res = await client.query(`
    INSERT INTO user_table (name, team_name, password, score)
    VALUES ('${user.username}', '${user.team}', '${user.password}', ${user.score})
    ON CONFLICT (team_name) DO NOTHING;`
  );
  return res;
}

const getUserRoster = async (user) => {
  const res = await client.query(`SELECT name FROM rider_table WHERE roster = ${user}`);
  return res.rows; //rows necessary for function reliant on it!
};

const addRiderToRoster = async (id, rider) => {
  const res = await client.query(`UPDATE rider_table SET roster = ${id} WHERE id = ${rider};`);
  return res;
};

const removeRiderFromRoster = async (rider) => {
  const res = await client.query(`UPDATE rider_table SET roster = null WHERE id = ${rider};`);
  return res;
};


function convertToPgDate () {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth()+1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export {getUserRoster, setNewUser, addRiderToRoster, removeRiderFromRoster, convertToPgDate}