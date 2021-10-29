import React, { useReducer } from 'react';
import { ReactNode } from 'react';
import Get from '../../apis/get';
import Put from '../../apis/put';
import CoachContext from './context';
import Reducer from './reducer';

interface Props {
	children: ReactNode;
}

const CoachState = (props: Props) => {
	let initialSeats: never[][] = [];
	for (let i = 0; i < 12; i++) {
		initialSeats.push([]);
	}
	// initial states of the Toast
	const InitialStates = {
		coach_id: '',
		total_seats_available: 80,
		booked_seats: initialSeats,
		newly_booked_seats: initialSeats,
	};

	// initializing reducer.
	// All the changes in the state related to Toasts will happen in reducer
	const [state, dispatch] = useReducer(Reducer, InitialStates);

	// book tickets for the selected no of seats
	const handleBookTickets = async (seats: number) => {
		const body = {
			required_seats: seats,
		};

		const response = await Put(`book_seats/${state.coach_id}`, body);
		console.log(response);

		if (response?.success === true) {
			let total_seats_available = response.data.coach.total_seats_available;
			let booked_seats = response.data.coach.booked_seats;
			let coach_id = String(response.data.coach._id);
			dispatch({
				type: 'SET_BOOKINGS',
				payload: { total_seats_available, booked_seats, coach_id },
			});
			dispatch({
				type: 'SET_NEW_BOOKINGS',
				payload: { newly_booked_seats: response.data.newly_booked_seats },
			});

			return;
		}

		alert('Something went wrong');
	};

	// book tickets for the selected no of seats
	const handleRefreshTickets = async () => {
		const body = {
			total_seats_available: 80,
			booked_seats: initialSeats,
		};

		const response = await Put(`refresh_bookings/${state.coach_id}`, body);

		if (response?.success === true) {
			let total_seats_available = response.data.total_seats_available;
			let booked_seats = response.data.booked_seats;
			let coach_id = String(response.data._id);
			dispatch({
				type: 'SET_BOOKINGS',
				payload: { total_seats_available, booked_seats, coach_id },
			});
			dispatch({
				type: 'SET_NEW_BOOKINGS',
				payload: { newly_booked_seats: initialSeats },
			});

			return;
		}

		alert('Something went wrong');
	};

	// book tickets for the selected no of seats
	const handleGetTickets = async () => {
		const response = await Get('check_availability');

		if (response?.success === true) {
			let total_seats_available = response.data.total_seats_available;
			let booked_seats = response.data.booked_seats;
			let coach_id = String(response.data._id);
			dispatch({
				type: 'SET_BOOKINGS',
				payload: { total_seats_available, booked_seats, coach_id },
			});

			return;
		}

		alert('Something went wrong');
	};

	return (
		<CoachContext.Provider
			value={{
				total_seats_available: state.total_seats_available,
				booked_seats: state.booked_seats,
				newly_booked_seats: state.newly_booked_seats,
				handleBookTickets,
				handleGetTickets,
				handleRefreshTickets,
			}}
		>
			{props.children}
		</CoachContext.Provider>
	);
};

export default CoachState;
