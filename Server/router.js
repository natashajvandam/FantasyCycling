import { Router } from 'express';
const router = Router();

//import fetchRiderData from './controllers/riderData.controller.js';
import {fetchTeam, createNewTeam, addRider, removeRider, fetchUserData} from './controllers/userData.controller.js';

//router.get('/allriders', fetchRiderData); 
//---needs to return name, (teamname?), price, whether on roster?, (current points?)

router.post('/newTeam', createNewTeam);              //{ username, team, password} = req.body; => returns
router.get('/team/:id', fetchTeam);                  //returns [{"name":"Hendrik"},{"name":"Wout"},...]
router.put('/team/add/:id/:rider', addRider);        //currently both id numbers(userId, riderId)
router.put('/team/delete/:id/:rider', removeRider);
router.get('/team/details/:id', fetchUserData);      //returns {"name":"natasha", "team-name":"myTeam", "score":0, "money":500}

router.all('*', (req, res) => res.status(404).send('Does not exist'));

export default router;