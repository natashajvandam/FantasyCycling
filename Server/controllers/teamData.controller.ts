import { Request, Response } from "express";
import { getUserRoster } from "../models/user.model";
import {
  addRiderToRoster,
  changeUserTeam,
  removeRiderFromRoster,
} from "../models/roster.model";

const teamData = () => {};

teamData.fetchTeam = async (req: Request, res: Response) => {
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

teamData.changeTeamName = async (req: Request, res: Response) => {
  // Function not in use in frontend
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

teamData.addRider = async (req: Request, res: Response) => {
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

teamData.removeRider = async (req: Request, res: Response) => {
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
export default teamData;
