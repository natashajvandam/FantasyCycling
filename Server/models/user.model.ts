import client from "./index.model";
import queries from "queries/userQueries";

const setNewUser = async (user: {
  email: string;
  nickname: string;
  password: string;
  score: number;
  money: number;
}) => {
  const res = await client.query(queries.SET_NEW_USER(user));
  return res.rows.length ? res.rows[0] : res;
};

const getUserDetails = async (nickname: string) => {
  const res = await client.query(queries.GET_USER_DETAILS(nickname));
  return res.rows[0];
};

const getUserRoster = async (user: string) => {
  if (user) {
    const res = await client.query(queries.GET_USER_ROSTER(user));
    return res.rows; // rows necessary for function reliant on it.
  }
  return null;
};

const fetchAllRiders = async () => {
  const res = await client.query(queries.FETCH_ALL_RIDERS()); // temporary 'WHERE' statement to help load faster
  return res.rows;
};

const fetchAllUsers = async () => {
  const res = await client.query(queries.FETCH_ALL_USERS());
  return res.rows;
};

export {
  getUserRoster,
  getUserDetails,
  setNewUser,
  fetchAllRiders,
  fetchAllUsers,
};
