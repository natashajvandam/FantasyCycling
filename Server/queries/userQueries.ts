const setNewUser = (user: {
  email: string;
  nickname: string;
  password: string;
  score: number;
  money: number;
}) => {
  return `
    INSERT INTO user_table (email, nickname, password, score, money)
    VALUES ('${user.email}', '${user.nickname}', '${user.password}', ${user.score}, ${user.money})
    ON CONFLICT (nickname) DO NOTHING
    RETURNING id;`;
};

const getUserDetails = (nickname: string) => {
  return `
    SELECT id, email, nickname, score, money FROM user_table WHERE nickname = '${nickname}';`;
};

const getUserRoster = (user: string) => {
  return `
    SELECT * FROM rider_table WHERE roster = ${user};`;
};

const fetchAllRiders = () => {
  return `
    SELECT * FROM rider_table WHERE price > 10;`; // temporary 'WHERE' statement to help load faster
};

const fetchAllUsers = () => {
  return `
    SELECT * FROM user_table;`;
};

const userQueries = {
  SET_NEW_USER: setNewUser,
  GET_USER_DETAILS: getUserDetails,
  GET_USER_ROSTER: getUserRoster,
  FETCH_ALL_RIDERS: fetchAllRiders,
  FETCH_ALL_USERS: fetchAllUsers,
};

export default userQueries;
