"use strict";
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
    console.log(error);
    res.sendStatus(500);
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
    console.log(error);
    res.sendStatus(500);
  }
};

const fetchUserData = async (req, res) => {
  try {
    const nickname = req.params.nickname;
    console.log("nickname in control", nickname);
    const userDetails = await getUserDetails(nickname);
    if (userDetails) {
      res.status(201);
      res.send(userDetails);
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
  createNewUser,
  addRider,
  removeRider,
  fetchRiders,
  changeTeamName,
  fetchUsers,
};
