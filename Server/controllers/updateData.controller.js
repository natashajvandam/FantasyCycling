import fetchRiderData from './riderData.controller.js';
import cron from 'node-cron';
import {updateRiderTable, updateScoresTable, updateTeamScores} from '../models/update.model.js';

cron.schedule('1 * * * * *', async () => {
  //proper timeline: uae tour (end of february) - il lombardia (beginning of october)
  console.log('updated');
  fetchRiderData()
    .then(data => updateRiders(data))
    .then(data => updateScores(data))
    .catch(error => console.log(error));
});

const updateRiders = (data) => {
  data.forEach(obj => {
    updateRiderTable(obj.rider)
  })
  return data;
}

const updateScores = async (data) => {
  data.forEach(obj => {
    const riderScore = {};
    riderScore.score = +obj.score;
    riderScore.rider = obj.rider;
    updateScoresTable(riderScore).then(scoreIncrease => {
      if (scoreIncrease > 0) { updateTeamScores(scoreIncrease, obj.rider)}
    });
  });
  return data;
}

