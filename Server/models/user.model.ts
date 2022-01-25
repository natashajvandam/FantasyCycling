import client from "./index.model";

const setNewUser = async (user: {
  email: string;
  nickname: string;
  password: string;
  score: number;
  money: number;
}) => {
  const res = await client.query(`
    INSERT INTO user_table (email, nickname, password, score, money)
    VALUES ('${user.email}', '${user.nickname}', '${user.password}', ${user.score}, ${user.money})
    ON CONFLICT (nickname) DO NOTHING
    RETURNING id;`);
  return res.rows.length ? res.rows[0] : res;
};

const getUserDetails = async (nickname: string) => {
  const res = await client.query(
    `SELECT id, email, nickname, score, money FROM user_table WHERE nickname = '${nickname}';`
  );
  return res.rows[0];
};

const getUserRoster = async (user: string) => {
  if (user) {
    const res = await client.query(
      `SELECT * FROM rider_table WHERE roster = ${user};`
    );
    return res.rows; // rows necessary for function reliant on it.
  }
  return null;
};

const fetchAllRiders = async () => {
  const res = await client.query(`SELECT * FROM rider_table WHERE price > 10;`); // temporary 'WHERE' statement to help load faster
  return res.rows;
};

const fetchAllUsers = async () => {
  const res = await client.query(`SELECT * FROM user_table;`);
  return res.rows;
};

export {
  getUserRoster,
  getUserDetails,
  setNewUser,
  fetchAllRiders,
  fetchAllUsers,
};
