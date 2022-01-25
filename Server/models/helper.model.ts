import client from "./index.model";
import riderPrices from "./valueLibrary";
import queries from "queries/helperQueries";
import ModelRider from "Types/models";
// ----global-helper-------------------------------->

// ----update-image-helper--------------------------->
// not using because images take too long to fetch
const fetchRiderNames = async () => {
  const res = await client.query(
    // eslint-disable-next-line comma-dangle
    queries.FETCH_RIDERS
  );
  return res.rows;
};

// ----update--helpers------------------------------->
const getRoster = async (user: string) => {
  const roster = await client.query(queries.GET_ROSTER(user));
  return roster;
};

const fetchRiderScores = async (rider: ModelRider) => {
  const startScore = await client.query(queries.GET_START_SCORE(rider));

  const endScore = await client.query(queries.GET_END_SCORE(rider));

  const startingScore = startScore.rows[startScore.rows.length - 1].score;
  const endingScore = endScore.rows[endScore.rows.length - 1].score;

  return endingScore - startingScore;
};

const updateUserScore = async (newScore: number, user: string) => {
  const res = await client.query(queries.UPDATE_SCORE(newScore, user));

  return res;
};

const findPrice = (rank: string) => {
  const intRank = parseInt(rank, 10);
  if (intRank >= 100) {
    return 10;
  }
  return riderPrices[intRank];
};

export {
  fetchRiderNames,
  getRoster,
  fetchRiderScores,
  updateUserScore,
  findPrice,
};
