import { Request, Response } from "express";

import { fetchAllRiders } from "../models/user.model";
import {
  addRiderToRoster,
  removeRiderFromRoster,
} from "../models/roster.model";

const riderData = () => {};

riderData.fetchRiders = async (req: Request, res: Response): Promise<void> => {
  try {
    const fullList = await fetchAllRiders();
    res.status(200);
    res.send(fullList);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export default riderData;
