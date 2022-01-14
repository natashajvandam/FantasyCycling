'use strict';

import client from './index.model.js';
import {convertToPgDate, getRoster, fetchRiderScores, updateUserScore, findPrice} from './helper.model.js';

const updateRiderTable = async (rider, rank, team) => {
  rider = rider.replaceAll("'", "''");
  team = team.replaceAll("'", "''");
  const value = findPrice(rank);
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
  try {
    array.forEach(async (riderObj) => {
      if (riderObj.image) {
        const name = riderObj.rider.rider.replaceAll("'", "''");
        const image = riderObj.image.replaceAll("'", "''");
        const res = await client.query(`
          UPDATE rider_table SET image = '${image}' 
          WHERE name = '${name}';`
        );
        console.log(res.rowCount);
      }
    })
  } catch (error) {
    console.log('error inserting (insertImages):', error);
  }
}

// const makeArraySmaller = async (array) => {
//   const l = Math.round(array.length/2);
//   const beginning = array.slice(0, l);
//   const end = array.slice(l);
//   const finished1 = Promise.allSettled(beginning).then(result => insertImages(result));
//   const finished2 = Promise.allSettled(end).then(result => insertImages(result));

// }

export {updateRiderTable, updateScoresTable, updateUserTable, insertImages};