"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// import fetchRiderData from './controllers/riderData.controller.js';
const userData_controller_js_1 = require("./controllers/userData.controller.js");
router.get('/allriders', userData_controller_js_1.fetchRiders);
router.get('/allUsers', userData_controller_js_1.fetchUsers);
router.post('/newTeam', userData_controller_js_1.createNewTeam); // { username, team, password} = req.body; => returns {id:"1"}
// router.get('/team/details/:nickname', fetchUserData); //returns {"name":"natasha", "team-name":"myTeam", "score":0, "money":500}
router.put('/team/:id', userData_controller_js_1.changeTeamName);
router.get('/team/:id', userData_controller_js_1.fetchTeam); // returns [{"name":"Hendrik"},{"name":"Wout"},...]
router.put('/team/add/:id/:rider', userData_controller_js_1.addRider); // currently both id numbers(userId, riderId)
router.put('/team/delete/:id/:rider', userData_controller_js_1.removeRider);
router.post('/user/details', userData_controller_js_1.fetchUserData);
router.all('*', (req, res) => res.status(404).send('Does not exist'));
exports.default = router;
//# sourceMappingURL=router.js.map