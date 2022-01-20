'use strict';
import {
  getUserRoster,
  setNewUser,
  getUserDetails,
  fetchAllRiders,
  fetchAllUsers,
} from '../models/user.model.js';
import {
  addRiderToRoster,
  removeRiderFromRoster,
  changeUserTeam,
} from '../models/roster.model.js';

const fetchRiders = async (req, res) => {
  try {
    const fullList = await fetchAllRiders();
    res.status(200);
    res.send(fullList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createNewTeam = async (req, res) => {
  try {
    const { username, team, password } = req.body;
    const newUser = await setNewUser({ username, team, password, score: 0 });
    res.status(201);
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const fetchUserData = async (req, res) => {
  try {
    const nickname = req.body.nickname;
    const email = req.body.email;
    console.log('nickname in control', nickname);
    let userDetails = await getUserDetails(nickname, email);
    console.log(userDetails);
    if (!userDetails) {
      userDetails = await setNewUser(req.body);
    }
    if (!userDetails.rowCount) {
      res.status(201);
      res.send(userDetails);
    } else {
      console.log('problem getting user: doesnt exist');
      res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
    console.log(error);
    res.sendStatus(500);
  }
};

const fetchTeam = async (req, res) => {
  try {
    const user = req.params.id;
    const rowOfRiders = await getUserRoster(user);
    res.status(201);
    res.send(rowOfRiders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const fetchUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(201);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
    console.log(error);
    res.sendStatus(500);
  }
};

const removeRider = async (req, res) => {
  try {
    const { id, rider } = req.params;
    const team = await removeRiderFromRoster(id, rider);
    res.status(204);
    res.send(team); // will automatically send status 200
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export {
  fetchTeam,
  fetchUserData,
  createNewTeam,
  addRider,
  removeRider,
  fetchRiders,
  changeTeamName,
  fetchUsers,
};
