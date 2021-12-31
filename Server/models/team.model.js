import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserTeamSchema = new Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  password: {type: String, required: true },
  score: { type: Number, default: 0},
	riders: { type: Array}
});

module.exports = mongoose.model('CyclingFantasyTeam', UserTeamSchema); // collection = 'CyclingFantasyTeams' 
// Mongoose creates the collection for you with the pluralized version