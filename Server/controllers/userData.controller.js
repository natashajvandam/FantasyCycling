'use strict';
import { getUserRoster, setNewUser, addRiderToRoster, removeRiderFromRoster } from '../models/team.model.js';

const fetchTeam = async (req, res) => {
  try {
    const user = req.params.id;
    const rowOfRiders = await getUserRoster(user);
    res.send(rowOfRiders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

const createNewTeam = async (req, res) => {
  try {
    const { username, team, password} = req.body;
    const newUser = await setNewUser({ name: username, teamName: team, password, score:0 });
    //not sure what this response will be
    res.status(201);
    res.send(newUser);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}

const addRider = async (req, res) => {
  try {
    const { id, rider } = req.params;
    const team = await addRiderToRoster(rider, id);
    res.send(team); // will automatically send status 200
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}


const removeRider = async (req, res) => {
  try {
    const { id, rider } = req.params;
    const team = await removeRiderFromRoster(rider, id);
    res.send(team); // will automatically send status 200
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export {fetchTeam, createNewTeam, addRider, removeRider}


// async function returnMessages(ctx) {
//   const query = "SELECT author_id, timestamp, content FROM message;";
//   const results = await team.query(query);
//   ctx.body = JSON.stringify(results.rows);
//   ctx.status = 200;
// }

// function addMessages(ctx) {
//   const { authorId, timestamp, content } = ctx.request.body;
//   query =
//     "INSERT INTO message(author_id, timestamp, content) " +
//     "VALUES (" +
//     authorId +
//     ", " +
//     timestamp +
//     ", '" +
//     content +
//     "')";
//   team.query(query);
//   ctx.status = 201;
// }

// module.exports.addMessages = addMessages;
// module.exports.returnMessages = returnMessages;



// exports.getAll = async ctx => {
//   try {
//     ctx.body = await message.getAll();
//   } catch (e) {
//     ctx.status = 500;
//     // Further handle your error on the back-end
//   }
// };

// exports.post = async ctx => {
//   try {
//     await message.set(ctx.request.body);
//     ctx.status = 200;
//   } catch (e) {
//     ctx.status = 500;
//     // Further handle your error on the back-end
//   }
// };