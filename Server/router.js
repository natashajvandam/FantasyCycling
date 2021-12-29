import express from 'express';
const router = express.Router();

import fetchRiderData from './controllers/riderData.controller.js';

router.get('/allriders', fetchRiderData);
//router.post('/topics', topic.createTopic);
//router.put('/topics/:id/:dir', topic.voteTopic );
//router.delete('/topics/:id', topic.deleteTopic );
router.all('*', (req, res) => res.status(404).send('Does not exist'));

export default router;