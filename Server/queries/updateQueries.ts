const updateRiderTable = (rider: string, value: number, team: string) => {
  return `
  INSERT into rider_table (name, price, team) 
  VALUES ('${rider}', ${value}, '${team}') 
  ON CONFLICT (name) DO UPDATE
  SET team = EXCLUDED.team;`;
};

const getPrevScore = (rider: string) => {
  return `
  SELECT score FROM score_table WHERE rider = '${rider}';`;
};

const updateScore = (
  rider: string,
  date: string,
  prevScore: any,
  oldScore: number
) => {
  return `
      INSERT into score_table (rider, score, updated_at, prev_score) 
      VALUES ('${rider}', ${prevScore}, '${date}', ${oldScore})
      ON CONFLICT ON CONSTRAINT unchanged_score 
      DO UPDATE SET prev_score = EXCLUDED.prev_score;`;
};

const insertImages = (
  image: string | undefined,
  points: string[],
  nextRace: string | undefined,
  name: string
) => {
  return `
  UPDATE rider_table SET image = '${image}', classic_pnts = ${
    parseInt(points[0], 10) || 0
  }, 
  gc_pnts = ${parseInt(points[1], 10) || 0}, tt_pnts = ${
    parseInt(points[2], 10) || 0
  }, 
  sprint_pnts = ${parseInt(points[3], 10) || 0}, climb_pnts = ${
    parseInt(points[4], 10) || 0
  },
  next_race = '${nextRace}' WHERE name = '${name}';`;
};
const updateQueries = {
  UPDATE_RIDER: updateRiderTable,
  GET_PREV_SCORE: getPrevScore,
  UPDATE_SCORE: updateScore,
  INSERT_IMAGES: insertImages,
};

export default updateQueries;
