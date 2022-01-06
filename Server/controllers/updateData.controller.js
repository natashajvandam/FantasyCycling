import fetchRiderData from './riderData.controller.js';
import getMockData from '../tests/mock.data.js';
import {updateRiderTable, updateScoresTable, updateUserTable} from '../models/update.model.js';

export const updateAllData = async () => {
  console.log('updated');
  //fetchRiderData()
  getMockData()
    .then(data => updateRiders(data))
    .then(data => updateScores(data))
    .then(data => updateUserScores(data))
    .catch(error => console.log(error));
};

const updateRiders = (data) => {
  data.forEach(obj => {
    updateRiderTable(obj.rider, obj.rank, obj.team)
  })
  return data;
}

const updateScores = async (data) => {
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

