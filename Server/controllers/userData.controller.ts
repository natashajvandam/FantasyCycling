import { Request, Response } from "express";

import userModel from "../models/user.model";

const userData = () => {};

userData.fetchUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.fetchAllUsers();
    res.status(201);
    res.send(users);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

userData.createNewUser = async (req: Request, res: Response) => {
  try {
    const { email, nickname, password } = req.body;
    const exist = await userModel.getUserDetails(nickname);
    if (!exist) {
      const newUser = await userModel.setNewUser({
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

userData.fetchUserData = async (req: Request, res: Response) => {
  try {
    const { nickname } = req.params;
    const userDetails = await userModel.getUserDetails(nickname);
    if (userDetails) {
      res.status(201);
      res.send(userDetails);
    } else {
      res.status(400);
      res.send("<h1>User does not exist</h1>");
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export default userData;
