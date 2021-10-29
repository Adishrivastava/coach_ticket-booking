import React, { useContext } from 'react';
import CoachContext from '../../context/ticketBooking/context';
import CoachRow from './coachRow';

interface Props {}

const CoachSection = (props: Props) => {
	const { booked_seats } = useContext(CoachContext);
	return (
		<div className="coach-section">
			<h5>Train Coach</h5>
			<div className="signs">
				<div className="sign">
					<div className="empty-circle"></div>
					<span className="sign-text">Empty Seats</span>
				</div>
				<div className="sign">
					<span className="booked-circle"></span>
					<span className="sign-text">Booked Seats</span>
				</div>
				<div className="sign">
					<span className="selected-circle"></span>
					<span className="sign-text">Selected Seats</span>
				</div>
			</div>
			<div className="train-coach">
				<div className="seats-section">
					{booked_seats.map((row: any, index: any) => {
						return <CoachRow num={index} row={row} key={index} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default CoachSection;
