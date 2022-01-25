import { RiderStats } from "types/names";
import client from "./index.model";
import convertToPgDate from "../helpers/convertDate";

import updateQueries from "../queries/updateQueries";

import {
  getRoster,
  fetchRiderScores,
  updateUserScore,
  findPrice,
} from "./helper.model";

const updateRiderTable = async (rider: string, rank: string, team: string) => {
  const formattedRider = rider?.replaceAll("'", "''");
  const formattedTeam = team?.replaceAll("'", "''");
  const value = findPrice(rank);
  const res = await client.query(
    updateQueries.UPDATE_RIDER(formattedRider, value, formattedTeam)
  );
  return res.rows;
};

const updateScoresTable = async (obj: { score: number; rider: string }) => {
  const rider = obj.rider.replaceAll("'", "''");
  const date = convertToPgDate();
  const prevScore = await client.query(updateQueries.GET_PREV_SCORE(rider));
  const oldScore = prevScore.rows.length
    ? prevScore.rows[prevScore.rows.length - 1].score
    : obj.score;
  const res = await client.query(
    updateQueries.UPDATE_SCORE(rider, date, prevScore, oldScore)
  );
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
      await client.query(
        updateQueries.INSERT_IMAGES(image, riderObj.pnts, nextRace, name)
      );
    });
  } catch (error) {
    throw new Error(`error inserting (insertImages): ${error}`);
  }
};

export { updateRiderTable, updateScoresTable, updateUserTable, insertImages };
