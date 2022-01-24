/* eslint-disable import/no-unresolved */
import { Request, Response } from "express";

import {
  getUserRoster,
  setNewUser,
  getUserDetails,
  fetchAllRiders,
  fetchAllUsers,
} from "../models/user.model";
import {
  addRiderToRoster,
  removeRiderFromRoster,
  changeUserTeam,
} from "../models/roster.model";

const fetchRiders = async (req: Request, res: Response) => {
  try {
    const fullList = await fetchAllRiders();
    res.status(200);
    res.send(fullList);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const createNewUser = async (req: Request, res: Response) => {
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
    res.send(error);
  }
};

const fetchUserData = async (req: Request, res: Response) => {
  try {
    const { nickname } = req.params;
    const userDetails = await getUserDetails(nickname);
    if (userDetails) {
      res.status(201);
      res.send(userDetails);
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const changeTeamName = async (req: Request, res: Response) => {
  try {
    const user = req.params.id;
    const { newName } = req.body;
    const userDetails = await changeUserTeam(parseInt(user, 10), newName);
    res.status(201);
    res.send(userDetails);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const fetchTeam = async (req: Request, res: Response) => {
  try {
    const user = req.params.id;
    const rowOfRiders = await getUserRoster(user);
    res.status(201);
    res.send(rowOfRiders);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const fetchUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
    res.status(201);
    res.send(users);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const addRider = async (req: Request, res: Response) => {
  try {
    const { id, rider } = req.params;
    const roster = await addRiderToRoster(parseInt(id, 10), JSON.parse(rider));
    if (roster) {
      res.status(204);
      res.send(roster); // will automatically send status 200
    } else {
      res.sendStatus(405);
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const removeRider = async (req: Request, res: Response) => {
  try {
    const { id, rider } = req.params;
    const team = await removeRiderFromRoster(
      parseInt(id, 10),
      JSON.parse(rider)
    );
    res.status(204);
    res.send(team); // will automatically send status 200
  } catch (error) {
    res.status(500);
    res.send(error);
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
