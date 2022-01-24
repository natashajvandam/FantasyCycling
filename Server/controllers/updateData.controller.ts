/* eslint-disable import/no-unresolved */
// import getMockData from '../tests/mock.data.js'; //for testing

// webscrapers
import fetchRiderData from "../webscrapers/riderData.webscraper";
import fetchRiderPhoto from "../webscrapers/riderPhotos.webscraper.js";

import {
  updateRiderTable,
  updateScoresTable,
  updateUserTable,
  insertImages,
} from "../models/update.model.js";
import { convertToPgDate } from "../models/helper.model.js";

// ---GET ALL DATA FROM WEB---------------------------------------->
const loopThroughPages = async (start, end) => {
  const allData = [];
  for (let i = start; i <= end; i += 1) {
    const date = convertToPgDate();
    fetchRiderData(
      // eslint-disable-next-line comma-dangle
      `https://www.procyclingstats.com/rankings.php?date=${date}&nation=&age=&zage=&page=smallerorequal&team=&offset=${i}00&teamlevel=&filter=Filter`
    ).then((res) => allData.concat(res));
  }
  return allData;
};

// ---STEP 1---------------------------------------------------------> use data to update riders
const updateRiders = (data) => {
  data.forEach(async (obj) => {
    await updateRiderTable(obj.rider, obj.rank, obj.team);
  });
  return data;
};

// ---STEP 2-------------------------------------------------------> use data to update rider scores
const updateScores = async (data) => {
  data.forEach(async (obj) => {
    const riderScore = {};
    riderScore.score = parseInt(obj.score, 10);
    riderScore.rider = obj.rider;
    await updateScoresTable(riderScore);
  });
  return data;
};

// ---STEP 3--------------------------------------------------------> use data to update user scores
const updateUserScores = async (data) => {
  await updateUserTable();
  return data;
};
// ---STEP 4 helper--------------------------------------------------> split first and last names
const splitNames = async (data) => {
  const names = data.map((rider) => {
    const nameArray = rider.rider.split(" ");
    const firstName = nameArray.pop();
    const lastNames = nameArray.join("-");
    return { firstName, lastNames, rider };
  });
  return names;
};

// ---STEP 4------------------------------------------------------> use names to update rider images
const updatePhotoLinks = async (data) => {
  try {
    const riderAndNamesArray = await splitNames(data);
    // -> web scraper for images
    const riderAndImageArray = await fetchRiderPhoto(riderAndNamesArray);
    await insertImages(riderAndImageArray);
  } catch (err) {
    throw new Error(err);
  }
  return data;
};

// Ideally:
// const data = await loopThroughPages(1);
// TEST that give 1 I get the data I want

// Run loopThroughPages(1) -> store 'data'
// TEST: 1) given data, what does updateRiders(data) return
// data = updateRiders(data)

// TEST: 2) given data from above, test updateScores(data)

// --STEP 5-------------------------------------------> repeats updateAllData on next batch of pages
const callAgain = (start, end, next) => {
  // - changing "start" and "end" to run functions again on the next patch of pages then update...
  const newStart = end + 1;
  if (end <= 22) {
    // eslint-disable-next-line no-use-before-define
    next(newStart, end, updateAllData);
  }
};

const updateAllData = async (start, end, next) => {
  // getMockData() -- for testing
  const result = loopThroughPages(start, end) // -> webscraper for data
    .then((data) => updateRiders(data)) // - 1
    .then((data) => updateScores(data)) // - 2
    .then((data) => updateUserScores(data)) // - 3
    .then((data) => updatePhotoLinks(data)) // - 4
    .catch((error) => {
      throw new Error(error);
    }); // - errors

  await result;
  callAgain(start, end, next); // - 5 -> call 'updateAllData' again if not on last page
};

export default updateAllData;