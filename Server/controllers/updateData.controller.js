import fetchRiderData from './riderData.controller.js';
import getMockData from '../tests/mock.data.js';
import cron from 'node-cron';
import {updateRiderTable, updateScoresTable, updateUserTable} from '../models/update.model.js';

cron.schedule('1 * * * * *', async () => {
  //proper timeline: uae tour (end of february) - il lombardia (beginning of october)
  console.log('updated');
  //fetchRiderData()
  getMockData()
    .then(data => updateRiders(data))
    .then(data => updateScores(data))
    .then(data => updateUserScores(data))
    .catch(error => console.log(error));
});

const updateRiders = (data) => {
  console.log('update riders called');
  data.forEach(obj => {
    updateRiderTable(obj.rider)
  })
  return data;
}

const updateScores = async (data) => {
  console.log('update scores called');
  data.forEach(obj => {
    const riderScore = {};
    riderScore.score = +obj.score;
    riderScore.rider = obj.rider;
    updateScoresTable(riderScore);
  });
  return data;
}

const updateUserScores = async (data) => {
  updateUserTable();
}

