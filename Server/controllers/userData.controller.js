'use strict';
import { getUserRoster, setNewUser, addRiderToRoster, removeRiderFromRoster, getUserDetails } from '../models/team.model.js';

const createNewTeam = async (req, res) => {
  try {
    const { username, team, password} = req.body;
    const newUser = await setNewUser({ username, team, password, score:0 });
    res.status(201);
    res.send(newUser);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}

const fetchUserData = async (req, res) => {
  try {
    const user = req.params.id;
    const userDetails = await getUserDetails(user);
    res.send(userDetails);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}

const fetchTeam = async (req, res) => {
  try {
    const user = req.params.id;
    const rowOfRiders = await getUserRoster(user);
    res.send(rowOfRiders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

const addRider = async (req, res) => {
  try {
    const { id, rider } = req.params;
    const roster = await addRiderToRoster(id, rider);
    res.send(roster); // will automatically send status 200
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

const removeRider = async (req, res) => {
  try {
    const { id, rider } = req.params;
    const team = await removeRiderFromRoster(id, rider);
    res.send(team); // will automatically send status 200
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export {fetchTeam, fetchUserData, createNewTeam, addRider, removeRider}