import fetchRiderData from './riderData.controller.js';
import getMockData from '../tests/mock.data.js';
import {updateRiderTable, updateScoresTable, updateUserTable} from '../models/update.model.js';
import getFirstAndLastName from './riderPhotos.controller.js';
import {fetchRiderNames} from '../models/team.model.js';
import client from '../models/index.model.js';
//const masterUrl = `https://www.procyclingstats.com/rankings.php?date=2022-01-07&nation=&age=&zage=&page=smallerorequal&team=&offset=${i}00&teamlevel=&filter=Filter`;
export const updateAllData = async () => {
  console.log('updated');

  //fetchRiderData()
  // getMockData()
  loopThroughPages()
    .then(data => updateRiders(data))
    .then(data => updateScores(data))
    .then(data => updateUserScores(data))
    .then(data => getRiderPhotoLinks(data))
    .catch(error => console.log(error));
};

const loopThroughPages = async () => {
  let allData = [];
  for (let i = 0; i <= 22; i++) {
    const arrayOfData = await fetchRiderData(`https://www.procyclingstats.com/rankings.php?date=2022-01-07&nation=&age=&zage=&page=smallerorequal&team=&offset=${i}00&teamlevel=&filter=Filter`);
    allData = allData.concat(arrayOfData);
  }
  return allData;
}

const getRiderPhotoLinks = async () => {
  fetchRiderNames()
    .then(data => getFirstAndLastName(data))
    .catch(error => console.log(error));
}

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

