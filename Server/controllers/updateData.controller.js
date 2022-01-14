//for testing
import getMockData from '../tests/mock.data.js';


//webscrapers
import fetchRiderData from '../webscrapers/riderData.webscraper.js';
import fetchRiderPhoto from '../webscrapers/riderPhotos.webscraper.js';

import {updateRiderTable, updateScoresTable, updateUserTable, insertImages} from '../models/update.model.js';
import {fetchRiderNames, convertToPgDate} from '../models/helper.model.js';


export const updateAllData = async (start, end, next) => {
  console.log('updating');
  // getMockData()
  const result = loopThroughPages(start, end)
    .then(data => updateRiders(data))       // - 1
    .then(data => updateScores(data))       // - 2
    .then(data => updateUserScores(data))   // - 3
    .then(data => updatePhotoLinks(data))   // - 4 -> takes too long
    .catch(error => console.log(error));    // - errors
  await result;
  start = end + 1;
  end = end +2;
  if (end <= 22){
    next(start, end, updateAllData)
  } else {
    console.log('complete')
  }
};
// Ideally:
// const data = await loopThroughPages(1);
// TEST that give 1 I get the data I want

// Run loopThroughPages(1) -> store 'data'
// TEST: 1) given data, what does updateRiders(data) return
// data = updateRiders(data)

// TEST: 2) given data from above, test updateScores(data)

//---GET ALL DATA FROM WEB---------------------------------------->
const loopThroughPages = async (start, end) => {
  let allData = [];
  for (let i = start; i <= end; i++) {
    //https://www.procyclingstats.com/rankings.php?date=2022-01-08&nation=&age=&zage=&page=smallerorequal&team=&offset=100&teamlevel=&filter=Filter
    const date = convertToPgDate();
    const arrayOfData = await fetchRiderData(`https://www.procyclingstats.com/rankings.php?date=${date}&nation=&age=&zage=&page=smallerorequal&team=&offset=${i}00&teamlevel=&filter=Filter`);
    allData = allData.concat(arrayOfData);
  }
  return allData;
}

//---STEP 1---------------------------------------------------------> use data to update riders
const updateRiders = (data) => {
  console.log('updating riders');
  data.forEach(async (obj) => {
    const res = await updateRiderTable(obj.rider, obj.rank, obj.team)
  });
  return data;
}

//---STEP 2---------------------------------------------------------> use data to update rider scores
const updateScores = async (data) => {
  console.log('updating scores');
  data.forEach(async (obj) => {
    const riderScore = {};
    riderScore.score = parseInt(obj.score);
    riderScore.rider = obj.rider;
    const res = await updateScoresTable(riderScore);
  });
  return data;
}

//---STEP 3---------------------------------------------------------> use data to update user scores
const updateUserScores = async (data) => {
  console.log('updating user score');
  const res = await updateUserTable();
  return data;
}

//---STEP 4---------------------------------------------------------> use names to update rider images
//not using because photo takes too long to fetch
const updatePhotoLinks = async (data) => {
  console.log(data)
  //fetchRiderNames()
  splitNames(data)
    .then(names => fetchRiderPhoto(names))
    .then(array => insertImages(array))
    .catch(error => console.log(error));
}

//---STEP 4 helper--------------------------------------------------> split first and last names
//not using because photos take too long to fetch
const splitNames = async (data) => {
  const names = data.map(rider => {
    const nameArray = rider.rider.split(' ');
    const firstName = nameArray.pop();
    const lastNames = nameArray.join('-');
    return {firstName, lastNames, rider};
  });
  return names;
}


