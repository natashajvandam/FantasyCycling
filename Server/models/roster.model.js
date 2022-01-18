'use strict';

import client from './index.model.js';
import {convertToPgDate} from './helper.model.js';

const changeUserTeam = async (id, newName) => { //--takes: userId, new team name | returns: { id: userId }
  newName = newName.replaceAll("'", "''");
  const user = await client.query(`
  UPDATE user_table SET nickname = '${newName}' 
  WHERE id = ${id};`
  )
  return user;
} 

const addRiderToRoster = async (id, rider) => { //--takes: userId, riderId | returns: whether successful
  const newMoneyAmount = await getResultingMoney (id, rider, true);
  const date = convertToPgDate();
  if (newMoneyAmount >= 0) {                  //- if enough money, attempt to add userId and added_at to rider_table
    //use more descriptive names
    const addRider = await client.query(`
      UPDATE rider_table SET roster = ${id}, added_at = '${date}'
      WHERE id = ${rider} AND roster IS NULL
      RETURNING name;` 
    );
    if (addRider.rowCount > 0) {              //- if successful, add rider name, userId, start_date to roster_table AND update user_table money
      const riderName = addRider.rows[0].name;
      await client.query(`
        INSERT INTO roster_table (roster, rider, start_date)
        VALUES (${id}, '${riderName}', '${date}')
        RETURNING roster, rider, start_date;`
        );
      const resOfPaying = await client.query(`
        UPDATE user_table SET money = ${newMoneyAmount} 
        WHERE id = ${id} RETURNING money;`
      );
      return resOfPaying;
    } else { 
      return addRider; 
    }
  }
  return false;
};

const removeRiderFromRoster = async (id, rider) => {
  const newMoneyAmount = await getResultingMoney (id, rider, false);
  const resOfRemoving = await client.query(`
    UPDATE rider_table SET roster = null, added_at = null
    WHERE id = ${rider} AND roster = ${id}
    RETURNING name;`
  );
  if (resOfRemoving.rowCount > 0) {
    const riderName = resOfRemoving.rows[0].name;
    const date = convertToPgDate();
    await client.query(`
      UPDATE roster_table SET end_date = '${date}' 
      WHERE roster = ${id} AND rider = '${riderName}';`
    )
    const resOfMoney = await client.query(`
      UPDATE user_table SET money = ${newMoneyAmount} 
      WHERE id = ${id} RETURNING money;`
    )
    return resOfMoney;
  } else {
    return 'cannot remove';
  }
};

//-helper
const getResultingMoney = async (id, rider, spending) => {
  const money = await client.query(`SELECT money FROM user_table WHERE id = ${id};`);
  const price = await client.query(`SELECT price FROM rider_table WHERE id = ${rider};`);
  return spending? (money.rows[0].money - price.rows[0].price) : (money.rows[0].money + price.rows[0].price);
}

export {addRiderToRoster, removeRiderFromRoster, changeUserTeam}