'use strict';

import client from './index.model.js';

const setNewUser = async (user) => { 
  const res = await client.query(`
    INSERT INTO user_table (name, team_name, password, score)
    VALUES ('${user.username}', '${user.team}', '${user.password}', ${user.score})
    ON CONFLICT (team_name) DO NOTHING
    RETURNING id;`
  );
  return (res.rows.length)? res.rows[0] : res;  
}

const getUserDetails = async (user) => {
  const res = await client.query(`SELECT id, name, team_name, score, money FROM user_table WHERE id = ${user};`);
  return res.rows[0];
}

const getUserRoster = async (user) => {
  if (user) {
    const res = await client.query(`SELECT * FROM rider_table WHERE roster = ${user};`);
    return res.rows; //rows necessary for function reliant on it.
  }
};

const fetchAllRiders = async () => {
  const res = await client.query(`SELECT * FROM rider_table;`);
  return res.rows;
}


export {getUserRoster, getUserDetails, setNewUser, fetchAllRiders}