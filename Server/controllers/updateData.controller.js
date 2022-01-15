// import getMockData from '../tests/mock.data.js'; //for testing


//webscrapers
import fetchRiderData from '../webscrapers/riderData.webscraper.js';
import fetchRiderPhoto from '../webscrapers/riderPhotos.webscraper.js';

import {updateRiderTable, updateScoresTable, updateUserTable, insertImages} from '../models/update.model.js';
import {convertToPgDate} from '../models/helper.model.js';


export const updateAllData = async (start, end, next) => {
  console.log('updating');
  // getMockData() -- for testing
  const result = loopThroughPages(start, end)   //-> webscraper for data
    .then(data => updateRiders(data))       // - 1
    .then(data => updateScores(data))       // - 2
    .then(data => updateUserScores(data))   // - 3
    .then(data => updatePhotoLinks(data))   // - 4
    .catch(error => console.log(error));    // - errors
 
  await result;
  callAgain(start, end, next); // - 5 -> call 'updateAllData' again if not on last page
};

//---GET ALL DATA FROM WEB---------------------------------------->
const loopThroughPages = async (start, end) => {
  let allData = [];
  for (let i = start; i <= end; i++) {
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
    await updateRiderTable(obj.rider, obj.rank, obj.team)
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
    await updateScoresTable(riderScore);
  });
  return data;
}

//---STEP 3---------------------------------------------------------> use data to update user scores
const updateUserScores = async (data) => {
  console.log('updating user score');
  await updateUserTable();
  return data;
}

//---STEP 4---------------------------------------------------------> use names to update rider images
const updatePhotoLinks = async (data) => {
  try {
    const riderAndNamesArray = await splitNames(data)
    const riderAndImageArray = await fetchRiderPhoto(riderAndNamesArray)  //-> web scraper for images
    await insertImages(riderAndImageArray)
  } catch (err) {
    console.log(err);
  }
  return data;
}

//---STEP 4 helper--------------------------------------------------> split first and last names
const splitNames = async (data) => {
  const names = data.map(rider => {
    const nameArray = rider.rider.split(' ');
    const firstName = nameArray.pop();
    const lastNames = nameArray.join('-');
    return {firstName, lastNames, rider};
  });
  return names;
}

//--STEP 5-----------------------------------------------------------> repeats updateAllData on next batch of pages
const callAgain = (start, end, next) => {
  start = end + 1; // - changing "start" and "end" to run functions again on the next patch of pages then update...
  end = end +2;
  if (end <= 22){
    next(start, end, updateAllData)
  } else {
    console.log('complete')
  }
}

// Ideally:
// const data = await loopThroughPages(1);
// TEST that give 1 I get the data I want

// Run loopThroughPages(1) -> store 'data'
// TEST: 1) given data, what does updateRiders(data) return
// data = updateRiders(data)

// TEST: 2) given data from above, test updateScores(data)