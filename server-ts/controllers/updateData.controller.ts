// import getMockData from '../tests/mock.data.js'; //for testing

//webscrapers
import fetchRiderData from '../webscrapers/riderData.webscraper.js';
import fetchRiderPhoto from '../webscrapers/riderPhotos.webscraper.js';

import {
  updateRiderTable,
  updateScoresTable,
  updateUserTable,
  insertImages,
} from '../models/update.model.js';
import { convertToPgDate } from '../models/helper.model.js';

export const updateAllData = async (
  start: number,
  end: number,
  next: Function
) => {
  console.log('updating');
  // getMockData() -- for testing
  const result = loopThroughPages(start, end) //-> webscraper for data
    .then((data) => updateRiders(data)) // - 1
    .then((data) => updateScores(data)) // - 2
    .then((data) => updateUserScores(data)) // - 3
    .then((data) => updatePhotoLinks(data)) // - 4
    .catch((error) => console.log(error)); // - errors

  await result;
  callAgain(start, end, next); // - 5 -> call 'updateAllData' again if not on last page
};

interface Data {
  rank: string;
  prev: string;
  next: string;
  rider: string;
  team: string;
  score: string;
}

//---GET ALL DATA FROM WEB---------------------------------------->
const loopThroughPages = async (start: number, end: number) => {
  let allData: Array<Data> = [];
  for (let i = start; i <= end; i++) {
    const date: string = convertToPgDate();
    const arrayOfData: Array<Data> | void = await fetchRiderData(
      `https://www.procyclingstats.com/rankings.php?date=${date}&nation=&age=&zage=&page=smallerorequal&team=&offset=${i}00&teamlevel=&filter=Filter`
    );
    if (arrayOfData) allData = allData.concat(arrayOfData);
  }
  return allData;
};

//---STEP 1---------------------------------------------------------> use data to update riders
const updateRiders = (data: Array<Data>) => {
  console.log('updating riders');
  data.forEach(async (obj: Data) => {
    await updateRiderTable(obj.rider, obj.rank, obj.team);
  });
  return data;
};

//---STEP 2---------------------------------------------------------> use data to update rider scores
const updateScores = async (data: Array<Data>) => {
  console.log('updating scores');
  data.forEach(async (obj: Data) => {
    const riderScore: { score: number; rider: string } = {
      score: 0,
      rider: '',
    };
    riderScore.score = parseInt(obj.score, 10);
    riderScore.rider = obj.rider;
    await updateScoresTable(riderScore);
  });
  return data;
};

//---STEP 3---------------------------------------------------------> use data to update user scores
const updateUserScores = async (data: Array<Data>) => {
  console.log('updating user score');
  await updateUserTable();
  return data;
};

interface Names {
  firstName: string;
  lastNames: string;
  rider: Data;
}

interface RiderImage {
  image: string;
  rider: Data;
  pnts: Array<number>;
  nextRace: string;
}

//---STEP 4---------------------------------------------------------> use names to update rider images
const updatePhotoLinks = async (data: Array<Data>) => {
  try {
    const riderAndNamesArray: Array<Names> = await splitNames(data);
    const riderAndImageArray: Array<RiderImage> = await fetchRiderPhoto(
      riderAndNamesArray
    ); //-> web scraper for images
    await insertImages(riderAndImageArray);
  } catch (err) {
    console.log(err);
  }
  return data;
};

//---STEP 4 helper--------------------------------------------------> split first and last names
const splitNames = async (data: Array<Data>) => {
  const names: Array<Names> = data.map((rider: Data) => {
    const nameArray: Array<string> = rider.rider.split(' ');
    const firstName: string = nameArray.pop();
    const lastNames: string = nameArray.join('-');
    return { firstName, lastNames, rider };
  });
  return names;
};

//--STEP 5-----------------------------------------------------------> repeats updateAllData on next batch of pages
const callAgain = (start: number, end: number, next: Function) => {
  start = end + 1; // - changing "start" and "end" to run functions again on the next patch of pages then update...
  end = end + 1;
  if (end <= 22) {
    next(start, end, updateAllData);
  } else {
    console.log('complete');
  }
};

// Ideally:
// const data = await loopThroughPages(1);
// TEST that give 1 I get the data I want

// Run loopThroughPages(1) -> store 'data'
// TEST: 1) given data, what does updateRiders(data) return
// data = updateRiders(data)

// TEST: 2) given data from above, test updateScores(data)
