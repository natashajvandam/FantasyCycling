'use strict';

import client from './index.model.js';
import {getUserRoster} from './team.model.js';

const updateRiderTable = async (rider) => {
  rider = rider.replaceAll("'", "''");
  const res = await client.query(`
    INSERT into rider_table (name) 
    VALUES ('${rider}') 
    ON CONFLICT (name) DO NOTHING;`
  );
  return res.rows;
}

const updateScoresTable = async (obj) => {
  let rider = obj.rider.replaceAll("'", "''");
    const date = convertToPgDate();
    const prevScore = await client.query(`
      SELECT score FROM score_table WHERE rider = '${rider}';`
    );
    const res = await client.query(`
      INSERT into score_table (rider, score, updated_at, prev_score) 
      VALUES ('${rider}', ${obj.score}, '${date}', ${prevScore.rows[0].score || obj.score})
      ON CONFLICT ON CONSTRAINT unchanged_score 
      DO UPDATE SET prev_score = EXCLUDED.prev_score;`
      //havent checked if this last line: do update set... works.
    );
    return res;
}

const updateUserTable = async () => {
  const userList = await client.query(`SELECT id FROM user_table;`);
  if (userList.rows.length) {
    userList.rows.forEach(async(userObj) => {
      const user = userObj.id;
      const riders = await getUserRoster(user);
      if (riders.length) {
        riders.forEach(async (rider) => {
          const latest = await fetchScores(rider);
          if (latest.score !== latest.prev_score) {
            updateUserScore(latest.score, latest.prev_score, user);
          }
        })
      }
    })
  }
}

//----HELPER-FUNCTIONS--------------------------------->
const fetchScores = async (rider) => {
  const scores = await client.query(`
    SELECT score, prev_score FROM score_table WHERE rider = '${rider.name}';`
  )
  return scores.rows[scores.rows.length-1];
}

const updateUserScore = async (score, prev, user) => {
  const newScore = (score-prev);
  const res = await client.query(`
    UPDATE user_table SET score = score + ${newScore} WHERE id = ${user};`
  );
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