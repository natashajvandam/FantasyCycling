'use strict';

import client from './index.model.js';
import {convertToPgDate} from './team.model.js';

const updateRiderTable = async (rider, rank, team) => {
  rider = rider.replaceAll("'", "''");
  team = team.replaceAll("'", "''");
  const value = await findPrice(rank);
  const res = await client.query(`
    INSERT into rider_table (name, price, team) 
    VALUES ('${rider}', ${value}, '${team}') 
    ON CONFLICT (name) DO UPDATE
    SET team = EXCLUDED.team;`
  );
  return res.rows;
}

const updateScoresTable = async (obj) => {
  let rider = obj.rider.replaceAll("'", "''");
    const date = convertToPgDate();
    const prevScore = await client.query(`
      SELECT score FROM score_table WHERE rider = '${rider}';`
    );
    const oldScore = prevScore.rows.length? prevScore.rows[prevScore.rows.length-1].score : obj.score;
    const res = await client.query(`
      INSERT into score_table (rider, score, updated_at, prev_score) 
      VALUES ('${rider}', ${obj.score}, '${date}', ${oldScore})
      ON CONFLICT ON CONSTRAINT unchanged_score 
      DO UPDATE SET prev_score = EXCLUDED.prev_score;`
    );
    return res;
}

const updateUserTable = async () => {
  const userList = await client.query(`SELECT id FROM user_table;`);
  if (userList.rows.length) {
    userList.rows.forEach( async (userObj) => {
      const user = userObj.id;
      //attempt:
      const roster = await getRoster(user);
      let userNewScore = 0;
      roster.rows.forEach( async (rider) => {
        userNewScore += await fetchRiderScores(rider);
      })
      //end
      if (userNewScore) {
        updateUserScore(userNewScore, user);
      }
    })
  }
}

const insertImages = async (array) => {
  array.forEach(async (riderObj) => {
    const name = riderObj.rider.name.replaceAll("'", "''");
    const res = await client.query(`
      UPDATE rider_table SET image = '${riderObj.image}' WHERE name = '${name}';`
    )
  })
}

//----HELPER-FUNCTIONS--------------------------------->
const getRoster = async (user) => {
  const roster = await client.query(`
    SELECT rider, end_date, start_date FROM roster_table 
    WHERE roster = ${user};`
  );
  return roster;
}

const fetchRiderScores = async (rider) => {
  const startScore = await client.query(`
    SELECT score FROM score_table WHERE rider='${rider.rider}' 
    AND updated_at >= TO_DATE('${rider.start_date}', 'Dy Mon DD YYYY');`
  );
  const end = rider.end_date || convertToPgDate();
  const endScore = await client.query(`
    SELECT score FROM score_table WHERE rider='${rider.rider}' 
    AND updated_at <= '${end}';`
  )
  const startingScore = startScore.rows[startScore.rows.length-1].score;
  const endingScore = endScore.rows[endScore.rows.length-1].score;
  return endingScore - startingScore;
}

const updateUserScore = async (newScore, user) => {
  const res = await client.query(`
    UPDATE user_table SET score = ${newScore} WHERE id = ${user};`
  );
  return res;
}

const findPrice = async (rank) => {
  if (rank >= 100) {return 10};
  return valueLibrary[rank];
}

const valueLibrary = ['buffer', 300, 260, 220, 180, 170, 160, 150, 
  140, 135, 130, 125, 120, 115, 110, 105, 100, 95, 90, 88, 
  85, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 59, 58, 56, 
  55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40,
  39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 28, 27, 27,
  26, 25, 25, 24, 24, 23, 23, 22, 22, 21, 21, 20, 20, 19, 
  19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 
  12, 12, 11, 11, 10, 10];


export {updateRiderTable, updateScoresTable, updateUserTable, insertImages};