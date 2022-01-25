import client from "./index.model";
import userQueries from "../queries/userQueries";

const userModel = () => {};

userModel.setNewUser = async (user: {
  email: string;
  nickname: string;
  password: string;
  score: number;
  money: number;
}) => {
  const res = await client.query(userQueries.SET_NEW_USER(user));
  return res.rows.length ? res.rows[0] : res;
};

userModel.getUserDetails = async (nickname: string) => {
  const res = await client.query(userQueries.GET_USER_DETAILS(nickname));
  return res.rows[0];
};

userModel.getUserRoster = async (user: string) => {
  if (user) {
    const res = await client.query(userQueries.GET_USER_ROSTER(user));
    return res.rows; // rows necessary for function reliant on it.
  }
  return null;
};

userModel.fetchAllRiders = async () => {
  const res = await client.query(userQueries.FETCH_ALL_RIDERS()); // temporary 'WHERE' statement to help load faster
  return res.rows;
};

userModel.fetchAllUsers = async () => {
  const res = await client.query(userQueries.FETCH_ALL_USERS());
  return res.rows;
};

export default userModel;
