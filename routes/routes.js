const express = require('express');
const router = express.Router();
const {
	check_availability,
	refresh_bookings,
	book_seats,
	create_coach,
} = require('../constants');
const {
	checkAvailability,
	refreshBookings,
	bookSeats,
	createCoach,
} = require('../controllers/seatsController');

router.route(create_coach).post(createCoach);
router.route(check_availability).get(checkAvailability);
router.route(refresh_bookings).put(refreshBookings);
router.route(book_seats).put(bookSeats);

module.exports = router;
