const findBestSeats = require('../helpers/findBestSeats');
const CoachSchema = require('../models/SeatsModel');
let initialSeats = [];
for (let i = 0; i < 12; i++) {
	initialSeats.push([]);
}
exports.createCoach = async (req, res, next) => {
	try {
		const coach = await CoachSchema.create(req.body);

		res.status(201).json({
			success: true,
			data: coach,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({ success: false });
	}
};

// to get the count and seat no. of availabile seats
// get -> /api/v1/checkAvailability
exports.checkAvailability = async (req, res, next) => {
	try {
		const coaches = await CoachSchema.find();

		res.status(200).json({
			success: true,
			data: coaches[0],
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({ success: false });
	}
};

// to book seats of train
// get -> /api/v1/book_seats
exports.bookSeats = async (req, res, next) => {
	try {
		const coach = await CoachSchema.findById(req.params.id);

		const required_seats = req.body.required_seats;

		if (required_seats > coach.total_seats_available) {
			res.status(400).json({
				success: false,
				message: 'Not enough seats available!',
			});
			return;
		}

		const { new_seatings, newly_booked_seats } = findBestSeats(
			coach?.booked_seats,
			required_seats
		);

		const new_coach = await CoachSchema.findByIdAndUpdate(
			req.params.id,
			{
				total_seats_available: coach.total_seats_available - required_seats,
				booked_seats: new_seatings,
			},
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			success: true,
			data: { coach: new_coach, newly_booked_seats },
		});
	} catch (err) {
		console.log(err);
		res.status(401).json({ success: false });
	}
};

// to refresh the coach of train
// get -> /api/v1/refreshSeats
exports.refreshBookings = async (req, res, next) => {
	try {
		const new_coach = await CoachSchema.findByIdAndUpdate(
			req.params.id,
			{
				booked_seats: initialSeats,
				total_seats_available: 80,
			},
			{
				new: true,
				runValidators: true,
			}
		);
		console.log(new_coach);
		res.status(200).json({
			success: true,
			data: new_coach,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			data: coach,
		});
	}
};
