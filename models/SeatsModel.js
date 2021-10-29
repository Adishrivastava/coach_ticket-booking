const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
	total_seats_available: {
		type: Number,
	},
	booked_seats: {
		maxlength: 80,
		type: Array,
	},
});

module.exports = mongoose.model('Coachs', CoachSchema);
