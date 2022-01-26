import { Request, Response } from "express";
import { io } from "../index";

import userModel from "../models/user.model";

const riderData = () => {};

riderData.fetchRiders = async (req: Request, res: Response): Promise<void> => {
  try {
    const fullList = await userModel.fetchAllRiders();
    io.emit("fetchriders", fullList);
    res.status(200);
    res.send(fullList);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export default riderData;
