import express from 'express';
const router = express.Router();

import fetchRiderData from './controllers/riderData.controller.js';
import {fetchTeam, createNewTeam, addRider, removeRider} from './controllers/userData.controller.js';

router.get('/allriders', fetchRiderData);
router.get('/team/:id', fetchTeam);
router.post('/newTeam', createNewTeam);
router.put('/team/:id/:rider', addRider);
router.delete('/team/:id/:rider', removeRider);
router.all('*', (req, res) => res.status(404).send('Does not exist'));

export default router;