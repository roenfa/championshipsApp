import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String, 
		required: true
	}
});

let Team = mongoose.model('Team', teamSchema);
export default Team;