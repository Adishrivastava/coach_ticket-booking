const Reducer = (state: any, action: { type: any; payload: any }) => {
	switch (action.type) {
		case 'SET_BOOKINGS':
			return {
				...state,
				total_seats_available: action.payload.total_seats_available,
				booked_seats: action.payload.booked_seats,
				coach_id: action.payload.coach_id,
			};
		case 'SET_NEW_BOOKINGS':
			return {
				...state,
				newly_booked_seats: action.payload.newly_booked_seats,
			};
	}
};

export default Reducer;
