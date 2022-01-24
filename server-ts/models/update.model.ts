'use strict';

import { QueryResult } from 'pg';
import client from './index.model.js';
import {
  convertToPgDate,
  getRoster,
  fetchRiderScores,
  updateUserScore,
  findPrice,
} from './helper.model.js';

const updateRiderTable = async (rider: string, rank: any, team: string) => {
  rider = rider.replaceAll("'", "''");
  team = team.replaceAll("'", "''");
  const value: number | string = findPrice(rank);
  const res: QueryResult = await client.query(`
    INSERT into rider_table (name, price, team)
    VALUES ('${rider}', ${value}, '${team}')
    ON CONFLICT (name) DO UPDATE
    SET team = EXCLUDED.team;`);
  return res.rows;
};

const updateScoresTable = async (obj: { score: number; rider: string }) => {
  const rider = obj.rider.replaceAll("'", "''");
  const date: string = convertToPgDate();
  const prevScore: QueryResult = await client.query(`
      SELECT score FROM score_table WHERE rider = '${rider}';`);
  const oldScore: number = prevScore.rows.length
    ? prevScore.rows[prevScore.rows.length - 1].score
    : obj.score;
  const res: QueryResult = await client.query(`
      INSERT into score_table (rider, score, updated_at, prev_score)
      VALUES ('${rider}', ${obj.score}, '${date}', ${oldScore})
      ON CONFLICT ON CONSTRAINT unchanged_score
      DO UPDATE SET prev_score = EXCLUDED.prev_score;`);
  return res;
};

const updateUserTable = async () => {
  const userList: QueryResult = await client.query(
    `SELECT id FROM user_table;`
  );
  if (userList.rows.length) {
    userList.rows.forEach(async (userObj: { id: number }) => {
      const user: number = userObj.id;
      const roster: QueryResult = await getRoster(user);
      let userNewScore: number = 0;
      roster.rows.forEach(async (rider: RiderDates) => {
        const riderValue: Promise<number> = fetchRiderScores(rider);
        userNewScore += await riderValue;
      });
      if (userNewScore) {
        updateUserScore(userNewScore, user);
      }
    });
  }
};

const insertImages = async (array: RiderImage[]) => {
  try {
    array.forEach(async (riderObj: RiderImage) => {
      const name: string = riderObj.rider.rider.replaceAll("'", "''");
      let image: string;
      let nextRace: string;
      if (riderObj.image) {
        image = riderObj.image.replaceAll("'", "''");
      }
      if (riderObj.nextRace) {
        nextRace = riderObj.nextRace.replaceAll("'", "''");
      }
      const res: QueryResult = await client.query(`
        UPDATE rider_table SET image = '${image}', classic_pnts = ${
        parseInt(riderObj.pnts[0], 10) || 0
      },
        gc_pnts = ${parseInt(riderObj.pnts[1], 10) || 0}, tt_pnts = ${
        parseInt(riderObj.pnts[2], 10) || 0
      },
        sprint_pnts = ${parseInt(riderObj.pnts[3], 10) || 0}, climb_pnts = ${
        parseInt(riderObj.pnts[4], 10) || 0
      },
        next_race = '${nextRace}' WHERE name = '${name}';`);
      console.log(res.rowCount);
    });
  } catch (error) {
    console.log('error inserting (insertImages):', error);
  }
};

export { updateRiderTable, updateScoresTable, updateUserTable, insertImages };
