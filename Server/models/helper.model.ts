/* eslint-disable import/no-unresolved */
import client from "./index.model";
import riderPrices from "./valueLibrary";
// ----global-helper-------------------------------->
function convertToPgDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}

// ----update-image-helper--------------------------->
// not using because images take too long to fetch
const fetchRiderNames = async () => {
  const res = await client.query(
    // eslint-disable-next-line comma-dangle
    "SELECT name FROM rider_table WHERE image is NULL OR image = 'undefined' AND price = 10"
  );
  return res.rows;
};

// ----update--helpers------------------------------->
const getRoster = async (user: string) => {
  const roster = await client.query(`
    SELECT rider, end_date, start_date FROM roster_table 
    WHERE roster = ${user};`);
  return roster;
};

const fetchRiderScores = async (rider: {
  rider: string;
  start_date: string;
  end_date: string;
}) => {
  const startScore = await client.query(`
    SELECT score FROM score_table WHERE rider='${rider.rider}' 
    AND updated_at <= TO_DATE('${rider.start_date}', 'Dy Mon DD YYYY');`);
  let endScore;
  if (rider.end_date) {
    endScore = await client.query(`
      SELECT score FROM score_table WHERE rider='${rider.rider}' 
      AND updated_at <= TO_DATE('${rider.end_date}', 'Dy Mon DD YYYY');`);
  } else {
    const today = convertToPgDate();
    endScore = await client.query(`
      SELECT score FROM score_table WHERE rider='${rider.rider}' 
      AND updated_at <= '${today}';`);
  }
  const startingScore = startScore.rows[startScore.rows.length - 1].score;
  const endingScore = endScore.rows[endScore.rows.length - 1].score;
  return endingScore - startingScore;
};

const updateUserScore = async (newScore: number, user: string) => {
  const res = await client.query(`
    UPDATE user_table SET score = ${newScore} WHERE id = ${user};`);
  return res;
};

const findPrice = (rank: string) => {
  const intRank = parseInt(rank);
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
  convertToPgDate,
};
