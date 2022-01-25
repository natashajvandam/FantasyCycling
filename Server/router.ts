import { Request, Response, Router } from "express";
import { RequestContext } from "express-openid-connect";

import riderData from "./controllers/riderData.controller";
import userData from "./controllers/userData.controller";
import teamData from "./controllers/teamData.controller";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const authenticated: RequestContext = req.oidc;
  res.render("index", {
    title: "express Demo",
    isAuthenticated: authenticated.isAuthenticated(),
  });
});

router.get("/all-riders", riderData.fetchRiders);

router.get("/all-users", userData.fetchUsers);
router.post("/new-user", userData.createNewUser); // { username, team, password} = req.body; => returns {id:"1"}
router.get("/user/:nickname", userData.fetchUserData); // returns {"name":"natasha", "team-name":"myTeam", "score":0, "money":500}

router.put("/team/:id", teamData.changeTeamName); // NOT CURRENTLY USED
router.get("/team/:id", teamData.fetchTeam); // returns [{"name":"Hendrik"},{"name":"Wout"},...]
router.put("/team/add/:id/:rider", teamData.addRider); // currently both id numbers(userId, riderId)
router.put("/team/delete/:id/:rider", teamData.removeRider);

router.all("*", (req: Request, res: Response) =>
  res.status(404).send("Does not exist")
);

export default router;
