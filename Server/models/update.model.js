'use strict';

import client from './index.model.js';

const updateRiderTable = async (rider) => {
  rider = rider.replaceAll("'", "''");
  const res = await client.query(`
    INSERT into rider_table (name) 
    VALUES ('${rider}') 
    ON CONFLICT (name) DO NOTHING
  `);
  return res.rows;
}

const updateScoresTable = async (obj) => {
  let rider = obj.rider.replaceAll("'", "''");
  const date = convertToPgDate();
  const res = await client.query(`
    INSERT into score_table (rider, score, updated_at) 
    VALUES ('${rider}', ${obj.score}, '${date}')
    ON CONFLICT (rider) DO
      UPDATE SET (updated_at, score) = (EXCLUDED.updated_at, EXCLUDED.score);
  `)
  return res.rows;
}

function convertToPgDate () {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth()+1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
export {updateRiderTable, updateScoresTable};