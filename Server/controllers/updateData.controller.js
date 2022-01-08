//for testing
import getMockData from '../tests/mock.data.js';

//webscrapers
import fetchRiderData from '../webscrapers/riderData.webscraper.js';
import fetchRiderPhoto from '../webscrapers/riderPhotos.webscraper.js';

import {updateRiderTable, updateScoresTable, updateUserTable, insertImages} from '../models/update.model.js';
import {fetchRiderNames} from '../models/team.model.js';


export const updateAllData = async () => {
  console.log('updating');
  // getMockData()
  loopThroughPages()
    .then(data => updateRiders(data))       // - 1
    .then(data => updateScores(data))       // - 2
    .then(data => updateUserScores(data))   // - 3
    .then(data => updatePhotoLinks(data))   // - 4
    .catch(error => console.log(error));    // - errors
};

//---GET ALL DATA FROM WEB---------------------------------------->
const loopThroughPages = async () => {
  let allData = [];
  for (let i = 0; i <= 22; i++) {
    const arrayOfData = await fetchRiderData(`https://www.procyclingstats.com/rankings.php?date=2022-01-07&nation=&age=&zage=&page=smallerorequal&team=&offset=${i}00&teamlevel=&filter=Filter`);
    allData = allData.concat(arrayOfData);
  }
  return allData;
}

//---STEP 1---------------------------------------------------------> use data to update riders
const updateRiders = (data) => {
  data.forEach(async (obj) => {
    const res = await updateRiderTable(obj.rider, obj.rank, obj.team)
  });
  return data;
}

//---STEP 2---------------------------------------------------------> use data to update rider scores
const updateScores = async (data) => {
  data.forEach(async (obj) => {
    const riderScore = {};
    riderScore.score = +obj.score;
    riderScore.rider = obj.rider;
    const res = await updateScoresTable(riderScore);
  });
  return data;
}

//---STEP 3---------------------------------------------------------> use data to update user scores
const updateUserScores = async (data) => {
  const res = await updateUserTable();
  return data;
}

//---STEP 4---------------------------------------------------------> use names to update rider images
const updatePhotoLinks = async () => {
  fetchRiderNames()
    .then(data => splitNames(data))
    .then(names => fetchRiderPhoto(names))
    .then(array => insertImages(array))
    .then(finished => {
      console.log('finished'); 
      return finished;
    })
    .catch(error => console.log(error));
}

//---STEP 4 helper--------------------------------------------------> split first and last names
const splitNames = (data) => {
  const names = data.map(rider => {
    const nameArray = rider.name.split(' ');
    const firstName = nameArray.pop();
    const lastNames = nameArray.join('-');
    return {firstName, lastNames, rider};
  });
  return names;
}


