// mongosh
import mongoose from 'mongoose'; //npm i mongoose

const databaseName = "test" //if not a database yet, mongoose creates the database for you
mongoose.connect(`mongodb://localhost/${databaseName}`);

const db = mongoose.connection;

db.on('error', () => {
  console.log('there was an error connecting to the database!');
});

db.once('open', () => {
  console.log('We are connected to the database!');
})

module.exports = db;