import ModelRider from "Types/models";
import convertToPgDate from "helpers/convertDate";

const getRoster = (user: string) => {
  return `
      SELECT rider, end_date, start_date FROM roster_table 
      WHERE roster = ${user};`;
};

const getStartScore = (rider: ModelRider) => {
  return `
    SELECT score FROM score_table WHERE rider='${rider.rider}' 
    AND updated_at <= TO_DATE('${rider.start_date}', 'Dy Mon DD YYYY');`;
};

const getEndScore = (rider: ModelRider) => {
  if (rider.end_date) {
    return `
    SELECT score FROM score_table WHERE rider='${rider.rider}' 
    AND updated_at <= TO_DATE('${rider.end_date}', 'Dy Mon DD YYYY');`;
  } else {
    const today = convertToPgDate();
    return `SELECT score FROM score_table WHERE rider='${rider.rider}' 
      AND updated_at <= '${today}';`;
  }
};

const updateScore = (newScore: number, user: string) => {
  return `
    UPDATE user_table SET score = ${newScore} WHERE id = ${user};`;
};

const helperQueries = {
  FETCH_RIDERS:
    "SELECT name FROM rider_table WHERE image is NULL OR image = 'undefined' AND price = 10",

  GET_ROSTER: getRoster,
  GET_START_SCORE: getStartScore,
  GET_END_SCORE: getEndScore,
  UPDATE_SCORE: updateScore,
};

export default helperQueries;
