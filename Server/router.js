import { Router } from 'express';
const router = Router();

//import fetchRiderData from './controllers/riderData.controller.js';
import {fetchTeam, createNewTeam, addRider, removeRider} from './controllers/userData.controller.js';

//router.get('/allriders', fetchRiderData); 
//---needs to return just name, (teamname?), price, whether on roster?, (current points?)
router.post('/newTeam', createNewTeam); //{ username, team, password} = req.body;
router.get('/team/:id', fetchTeam); //returns [{"name":"Hendrik"},{"name":"Natasha"},...]
router.put('/team/:id/:rider', addRider); //currently both id numbers(userId, riderId)
router.put('/team/:rider', removeRider);
router.all('*', (req, res) => res.status(404).send('Does not exist'));

export default router;