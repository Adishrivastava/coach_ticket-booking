import React from 'react';
import BookTickets from './book-tickets';
import CoachSection from './coachSection';

interface Props {}

const MainContent = (props: Props) => {
	return (
		<div className="main-content">
			<div className="book-ticket">
				<BookTickets />
			</div>
			<div className="coach-section">
				<CoachSection />
			</div>
		</div>
	);
};

export default MainContent;
