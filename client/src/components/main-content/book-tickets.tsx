import React, { useContext, useRef } from 'react';
import CoachContext from '../../context/ticketBooking/context';

interface Props {}

const BookTickets = (props: Props) => {
	const { handleBookTickets, total_seats_available, coach_id } =
		useContext(CoachContext);
	const inputRef: React.Ref<any> = useRef(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (inputRef.current.value > total_seats_available) {
			alert('Please enter a valid number');
			return;
		}

		console.log(inputRef?.current?.value);

		await handleBookTickets(inputRef?.current?.value);
		// inputRef.current.value = ;
	};

	return (
		<div className="book-tickets">
			<h5>{total_seats_available} seats are available</h5>
			<form onSubmit={handleSubmit} className="main-form">
				<input
					ref={inputRef}
					defaultValue={1}
					type="number"
					max={80}
					min={1}
					className="seats-input"
				/>
				<button type="submit">Book</button>
			</form>
		</div>
	);
};

export default BookTickets;
