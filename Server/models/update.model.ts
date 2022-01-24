/* eslint-disable import/no-unresolved */
import { RiderStats } from "types/names";
import client from "./index.model";
import {
  convertToPgDate,
  getRoster,
  fetchRiderScores,
  updateUserScore,
  findPrice,
} from "./helper.model";

const updateRiderTable = async (rider: string, rank: string, team: string) => {
  const formattedRider = rider?.replaceAll("'", "''");
  const formattedTeam = team?.replaceAll("'", "''");
  const value = findPrice(rank);
  const res = await client.query(`
    INSERT into rider_table (name, price, team) 
    VALUES ('${formattedRider}', ${value}, '${formattedTeam}') 
    ON CONFLICT (name) DO UPDATE
    SET team = EXCLUDED.team;`);
  return res.rows;
};

const updateScoresTable = async (obj: { score: number; rider: string }) => {
  const rider = obj.rider.replaceAll("'", "''");
  const date = convertToPgDate();
  const prevScore = await client.query(`
      SELECT score FROM score_table WHERE rider = '${rider}';`);
  const oldScore = prevScore.rows.length
    ? prevScore.rows[prevScore.rows.length - 1].score
    : obj.score;
  const res = await client.query(`
      INSERT into score_table (rider, score, updated_at, prev_score) 
      VALUES ('${rider}', ${obj.score}, '${date}', ${oldScore})
      ON CONFLICT ON CONSTRAINT unchanged_score 
      DO UPDATE SET prev_score = EXCLUDED.prev_score;`);
  return res;
};

const updateUserTable = async () => {
  const userList = await client.query(`SELECT id FROM user_table;`);
  if (userList.rows.length) {
    userList.rows.forEach(async (userObj) => {
      const user = userObj.id;
      const roster = await getRoster(user);
      let userNewScore = 0;
      roster.rows.forEach(async (rider) => {
        const riderValue = fetchRiderScores(rider);
        userNewScore += await riderValue;
      });
      if (userNewScore) {
        updateUserScore(userNewScore, user);
      }
    });
  }
};

const insertImages = async (
  array: {
    image: string;
    rider: RiderStats;
    pnts: string[];
    nextRace: string;
  }[]
) => {
  try {
    array.forEach(async (riderObj) => {
      const name = riderObj.rider.rider.replaceAll("'", "''");
      let image;
      let nextRace;
      if (riderObj.image) {
        image = riderObj.image.replaceAll("'", "''");
      }
      if (riderObj.nextRace) {
        nextRace = riderObj.nextRace.replaceAll("'", "''");
      }
      await client.query(`
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
    });
  } catch (error) {
    throw new Error(`error inserting (insertImages): ${error}`);
  }
};

export { updateRiderTable, updateScoresTable, updateUserTable, insertImages };
