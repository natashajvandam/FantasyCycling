import { Router } from "express";
import "dotenv/config";
const router = Router();

import {
  fetchRiders,
  fetchUsers,
  fetchTeam,
  addRider,
  removeRider,
  fetchUserData,
} from "./controllers/userData.controller.js";

import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
  audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
  issuerBaseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
});

router.get("/allriders", fetchRiders);
router.get("/allUsers", fetchUsers);
router.get("/team/:id", fetchTeam);
router.put("/team/add/:id/:rider", checkJwt, addRider);
router.put("/team/delete/:id/:rider", checkJwt, removeRider);
router.post("/user/details", fetchUserData);

router.all("*", (req, res) => res.status(404).send("Does not exist"));

export default router;
