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
} from "../models/roster.model.js";
import { Request, Response } from "express";
import { QueryResult } from "pg";

const fetchRiders = async (req: Request, res: Response) => {
  try {
    const fullList: Rider[] = await fetchAllRiders();
    res.status(200);
    res.send(fullList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const fetchUserData = async (req: Request, res: Response) => {
  try {
    const nickname: string = req.body.nickname;
    const email: string = req.body.email;
    let userDetails: User | any = await getUserDetails(nickname, email);

    if (!userDetails) {
      userDetails = await setNewUser(req.body);
    }
    if (!userDetails.rowCount) {
      res.status(201);
      res.send(userDetails);
    } else {
      console.log("problem getting user: doesnt exist");
      res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const fetchTeam = async (req: Request, res: Response) => {
  try {
    const user: string = req.params.id;
    const rowOfRiders: Rider[] = await getUserRoster(user);
    res.status(201);
    res.send(rowOfRiders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const fetchUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await fetchAllUsers();
    res.status(201);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const addRider = async (
  req: Request<{ id: string; rider: string }>,
  res: Response
) => {
  try {
    const { id, rider } = req.params;
    const roster: QueryResult | false = await addRiderToRoster(id, rider);
    if (roster) {
      res.status(204);
      res.send(roster);
    } else {
      res.sendStatus(405);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const removeRider = async (
  req: Request<{ id: string; rider: string }>,
  res: Response
) => {
  try {
    const { id, rider } = req.params;
    const team: QueryResult | string = await removeRiderFromRoster(id, rider);
    res.status(204);
    res.send(team);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export {
  fetchTeam,
  fetchUserData,
  addRider,
  removeRider,
  fetchRiders,
  fetchUsers,
};
