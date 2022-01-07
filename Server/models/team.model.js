'use strict';

import client from './index.model.js';

const setNewUser = async (user) => { 
  const res = await client.query(`
    INSERT INTO user_table (name, team_name, password, score)
    VALUES ('${user.username}', '${user.team}', '${user.password}', ${user.score})
    ON CONFLICT (team_name) DO NOTHING
    RETURNING id;`
  );
  if (res.rows.length < 1) {return 'unsuccessful', res}; //NOT WORKING....
  return 'userId:', res.rows[0];
}

const getUserRoster = async (user) => {
  const res = await client.query(`SELECT * FROM rider_table WHERE roster = ${user};`);
  return res.rows; //rows necessary for function reliant on it!
};

const getUserDetails = async (user) => {
  const res = await client.query(`SELECT name, team_name, score, money FROM user_table WHERE id = ${user};`);
  return res.rows[0];
}

const addRiderToRoster = async (id, rider) => {
  const newMoneyAmount = await getResultingMoney (id, rider, true);
  const date = convertToPgDate();
  if (newMoneyAmount >= 0) {
    const addRider = await client.query(`
      UPDATE rider_table SET roster = ${id}, added_at = '${date}'
      WHERE id = ${rider} AND roster IS NULL
      RETURNING name;` 
    );
    if (addRider.rowCount > 0) {
      const riderName = addRider.rows[0].name;
      const resOfRosterTable = await client.query(`
        INSERT INTO roster_table (roster, rider, start_date)
        VALUES (${id}, '${riderName}', '${date}')
        RETURNING roster, rider, start_date;`
        );
      const resOfPaying = await client.query(`
        UPDATE user_table SET money = ${newMoneyAmount} 
        WHERE id = ${id};`
      );
      return 'remaining: ' + newMoneyAmount;
    } else { 
      return 'did not add'; 
    }
  }
  return 'not enough'
};

const removeRiderFromRoster = async (id, rider) => {
  const newMoneyAmount = await getResultingMoney (id, rider, false);
  const resOfRemoving = await client.query(`
    UPDATE rider_table SET roster = null 
    WHERE id = ${rider} AND roster = ${id}
    RETURNING name;`
  );
  if (resOfRemoving.rowCount > 0) {
    const riderName = resOfRemoving.rows[0].name;
    const date = convertToPgDate();
    const resOfRosterTable = await client.query(`
      UPDATE roster_table SET end_date = '${date}' 
      WHERE roster = ${id} AND rider = '${riderName}';`
    )
    const resOfMoney = await client.query(`
      UPDATE user_table SET money = ${newMoneyAmount} 
      WHERE id = ${id};`
    )
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