import React, { useContext, useEffect } from 'react';
import MainContent from '../components/main-content/MainContent';
import Navbar from '../components/navbar';
import CoachContext from '../context/ticketBooking/context';

interface Props {}

const Homepage = (props: Props) => {
	const { handleGetTickets } = useContext(CoachContext);

	useEffect(() => {
		handleGetTickets();
	}, []);

	return (
		<div className="homepage">
			<Navbar brand="Ticket Booking" />
			<MainContent />
		</div>
	);
};

export default Homepage;
