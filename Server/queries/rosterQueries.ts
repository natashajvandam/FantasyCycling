import { Rider } from "Types/riders";

const changeTeamName = (newer: string, id: number) => {
  return `
    UPDATE user_table SET nickname = '${newer}' 
    WHERE id = ${id};`;
};

const getMoney = (id: number) => {
  return `SELECT money FROM user_table WHERE id = ${id};`;
};

const getPrice = (rider: Rider) => {
  return `SELECT price FROM rider_table WHERE id = ${rider};`;
};

const addRider = (id: number, date: string, rider: Rider) => {
  return `
    UPDATE rider_table SET roster = ${id}, added_at = '${date}'
    WHERE id = ${rider} AND roster IS NULL
    RETURNING name;`;
};

const updateRoster = (id: number, riderName: string, date: string) => {
  return `
  INSERT INTO roster_table (roster, rider, start_date)
  VALUES (${id}, '${riderName}', '${date}')
  RETURNING roster, rider, start_date;`;
};

const updateMoney = (money: number, id: number) => {
  return `
    UPDATE user_table SET money = ${money} 
    WHERE id = ${id} RETURNING money;`;
};

const removeFromRoster = (rider: Rider, id: number) => {
  return `
    UPDATE rider_table SET roster = null, added_at = null
    WHERE id = ${rider} AND roster = ${id}
    RETURNING name;`;
};

const updateRosterDate = (date: string, id: number, riderName: string) => {
  return `
  UPDATE roster_table SET end_date = '${date}' 
  WHERE roster = ${id} AND rider = '${riderName}';`;
};

const rosterQueries = {
  CHANGE_TEAM_NAME: changeTeamName,
  GET_MONEY: getMoney,
  GET_PRICE: getPrice,
  ADD_RIDER: addRider,
  UPDATE_ROSTER: updateRoster,
  UPDATE_MONEY: updateMoney,
  REMOVE_FROM_ROSTER: removeFromRoster,
  UPDATE_ROSTER_DATE: updateRosterDate,
};

export default rosterQueries;
