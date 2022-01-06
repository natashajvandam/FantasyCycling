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
  const res = await client.query(`SELECT name FROM rider_table WHERE roster = ${user};`);
  return res.rows; //rows necessary for function reliant on it!
};

const getUserDetails = async (user) => {
  const res = await client.query(`SELECT name, team_name, score, money FROM user_table WHERE id = ${user};`);
  return res.rows[0];
}

const addRiderToRoster = async (id, rider) => {
  const remainder = await getResultingMoney (id, rider, true);
  if (remainder >= 0) {
    const resOfAdding = await client.query(`UPDATE rider_table SET roster = ${id} WHERE id = ${rider} AND roster IS NULL;`);
    if (resOfAdding.rowCount >= 1) {
      const resOfPaying = await client.query(`UPDATE user_table SET money = ${remainder} WHERE id = ${id};`);
      return 'remaining: ' + remainder;
    } else { 
      return 'did not add'; 
    }
  }
  return 'not enough'
};

const removeRiderFromRoster = async (id, rider) => {
  const newMoneyAmount = await getResultingMoney (id, rider, false);
  const resOfRemoving = await client.query(`UPDATE rider_table SET roster = null WHERE id = ${rider} AND roster = ${id};`);
  if (resOfRemoving.rowCount >= 1) {
    const resOfMoney = await client.query(`UPDATE user_table SET money = ${newMoneyAmount} WHERE id = ${id};`)
    return resOfMoney;
  } else {
    return 'cannot remove';
  }
};

//----HELPER FUNCTIONS-------------------->
function convertToPgDate () {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth()+1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}


const getResultingMoney = async (id, rider, spending) => {
  const money = await client.query(`SELECT money FROM user_table WHERE id = ${id};`);
  const price = await client.query(`SELECT price FROM rider_table WHERE id = ${rider};`);
  return spending? (money.rows[0].money - price.rows[0].price) : (money.rows[0].money + price.rows[0].price);
}

export {getUserRoster, getUserDetails, setNewUser, addRiderToRoster, removeRiderFromRoster, convertToPgDate}