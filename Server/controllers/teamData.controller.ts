import { Request, Response } from "express";
import userModel from "../models/user.model";
import rosterModel from "../models/roster.model";
import { io } from "../index";

import client from "../models/index.model";
import userQueries from "../queries/userQueries";

const teamData = () => {};

teamData.fetchTeam = async (req: Request, res: Response) => {
  try {
    const user = req.params.id;
    const rowOfRiders = await userModel.getUserRoster(user);
    res.status(201);
    res.send(rowOfRiders);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

teamData.changeTeamName = async (req: Request, res: Response) => {
  // Function currently not in use
  try {
    const user = req.params.id;
    const { newName } = req.body;
    const userDetails = await rosterModel.changeUserTeam(
      parseInt(user, 10),
      newName
    );
    res.status(201);
    res.send(userDetails);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

teamData.addRider = async (req: Request, res: Response) => {
  try {
    const { id, rider } = req.params;
    const roster = await rosterModel.addRiderToRoster(
      parseInt(id, 10),
      JSON.parse(rider)
    );
    if (roster) {
      const test = await client.query(userQueries.FETCH_ALL_RIDERS());
      io.emit("fetchRiders", test.rows, id);
      res.status(204);
      res.send(roster);
    } else {
      res.sendStatus(405);
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

teamData.removeRider = async (req: Request, res: Response) => {
  try {
    const { id, rider } = req.params;
    const team = await rosterModel.removeRiderFromRoster(
      parseInt(id, 10),
      JSON.parse(rider)
    );
    const test = await client.query(userQueries.FETCH_ALL_RIDERS());
    io.emit("fetchRiders", test.rows, id);
    res.status(204);
    res.send(team);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
export default teamData;
