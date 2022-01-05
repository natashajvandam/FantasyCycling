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
    const prevScore = await client.query(`SELECT score FROM score_table WHERE rider = '${rider}';`);
    const res = await client.query(`
      INSERT into score_table (rider, score, updated_at, prev_score) 
      VALUES ('${rider}', ${obj.score}, '${date}', ${prevScore.rows[0].score || obj.score})
      ON CONFLICT ON CONSTRAINT unchanged_score DO NOTHING;`
    )
    return res;
}

const updateUserTable = async () => {
  const userList = await client.query(`
    SELECT id FROM user_table;
  `);
  if (userList.rows.length) {
    userList.rows.forEach(async(obj) => {
      const riders = await fetchRiders(obj);
      const user = obj.id;
      if (riders.rows.length) {
        riders.rows.forEach(async (obj) => {
          const latest = await fetchScores(obj);
          if (latest.score !== latest.prev_score) {
            updateUserScore(latest.score, latest.prev_score, user);
          }
        })
      }
    })
  }
}

//----HELPER-FUNCTIONS--------------------------------->
const fetchRiders = async (obj) => {
  const riders = await client.query(`
    SELECT name FROM rider_table WHERE roster = ${obj.id};
  `)
  return riders;
}

const fetchScores = async (obj) => {
  const scores = await client.query(`
    SELECT score, prev_score FROM score_table WHERE rider = '${obj.name}';
  `)
  return scores.rows[scores.rows.length-1];
}

const updateUserScore = async (score, prev, user) => {
  const newScore = (score-prev);
  const res = await client.query(`
    UPDATE user_table SET score = score + ${newScore} WHERE id = ${user};
  `);
  return res;
}

function convertToPgDate () {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth()+1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export {updateRiderTable, updateScoresTable, updateUserTable};