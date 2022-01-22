import {
  getUserRoster,
  setNewUser,
  getUserDetails,
  fetchAllRiders,
  fetchAllUsers,
} from "../models/user.model.js";
import {
  addRiderToRoster,
  removeRiderFromRoster,
  changeUserTeam,
} from "../models/roster.model.js";

const fetchRiders = async (req, res) => {
  try {
    const fullList = await fetchAllRiders();
    res.status(200);
    res.send(fullList);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const createNewUser = async (req, res) => {
  try {
    const { email, nickname, password } = req.body;
    const exist = await getUserDetails(nickname);
    if (!exist) {
      const newUser = await setNewUser({
        email,
        nickname,
        password,
        score: 0,
        money: 500,
      });
      res.status(201);
      res.send(newUser);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const fetchUserData = async (req, res) => {
  try {
    const { nickname } = req.params;
    const userDetails = await getUserDetails(nickname);
    if (userDetails) {
      res.status(201);
      res.send(userDetails);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const changeTeamName = async (req, res) => {
  try {
    const user = req.params.id;
    const { newName } = req.body;
    const userDetails = await changeUserTeam(user, newName);
    res.status(201);
    res.send(userDetails);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const fetchTeam = async (req, res) => {
  try {
    const user = req.params.id;
    const rowOfRiders = await getUserRoster(user);
    res.status(201);
    res.send(rowOfRiders);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const fetchUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(201);
    res.send(users);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const addRider = async (req, res) => {
  try {
    const { id, rider } = req.params;
    const roster = await addRiderToRoster(id, rider);
    if (roster) {
      res.status(204);
      res.send(roster); // will automatically send status 200
    } else {
      res.sendStatus(405);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const removeRider = async (req, res) => {
  try {
    const { id, rider } = req.params;
    const team = await removeRiderFromRoster(id, rider);
    res.status(204);
    res.send(team); // will automatically send status 200
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

export {
  fetchTeam,
  fetchUserData,
  createNewUser,
  addRider,
  removeRider,
  fetchRiders,
  changeTeamName,
  fetchUsers,
};
