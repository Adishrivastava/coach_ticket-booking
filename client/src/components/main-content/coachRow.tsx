import React, { useContext } from 'react';
import CoachContext from '../../context/ticketBooking/context';

interface Props {
	num: number;
	row: Array<number>;
}

const CoachRow = ({ num, row }: Props) => {
	const { booked_seats, newly_booked_seats } = useContext(CoachContext);

	return (
		<div className="row-section">
			{num !== 11
				? [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
						<div
							className={`seat ${
								newly_booked_seats[num].indexOf(item) > -1
									? `selected-seat`
									: booked_seats[num].indexOf(item) > -1
									? `filled-seat`
									: `empty-seat`
							}`}
							key={index}
						>
							<span className={`seat-number`}>{num * 7 + item}</span>
						</div>
				  ))
				: [1, 2, 3].map((item, index) => (
						<div
							className={`seat ${
								newly_booked_seats[num].indexOf(item) > -1
									? `selected-seat`
									: booked_seats[num].indexOf(item) > -1
									? `filled-seat`
									: `empty-seat`
							}`}
							key={index}
						>
							<span className="seat-number">{num * 7 + item}</span>
						</div>
				  ))}
		</div>
	);
};

export default CoachRow;
