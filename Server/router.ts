import { Router } from "express";

// import fetchRiderData from './controllers/riderData.controller.js';
import {
  fetchTeam,
  createNewUser,
  addRider,
  removeRider,
  fetchUserData,
  fetchRiders,
  changeTeamName,
  fetchUsers,
} from "./controllers/userData.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "express Demo",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});
router.get("/allriders", fetchRiders);
router.get("/allUsers", fetchUsers);
router.post("/newTeam", createNewUser); // { username, team, password} = req.body; => returns {id:"1"}
router.get("/team/details/:nickname", fetchUserData); // returns {"name":"natasha", "team-name":"myTeam", "score":0, "money":500}
router.put("/team/:id", changeTeamName);
router.get("/team/:id", fetchTeam); // returns [{"name":"Hendrik"},{"name":"Wout"},...]
router.put("/team/add/:id/:rider", addRider); // currently both id numbers(userId, riderId)
router.put("/team/delete/:id/:rider", removeRider);

router.all("*", (req, res) => res.status(404).send("Does not exist"));

export default router;
