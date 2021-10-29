import { useContext } from 'react';
import CoachContext from '../context/ticketBooking/context';

interface Props {
	brand: string;
}

const Navbar = ({ brand }: Props) => {
	const { handleRefreshTickets } = useContext(CoachContext);

	const handleClick = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		handleRefreshTickets();
	};

	return (
		<div className="navbar">
			<h2 className="navbar-brand">{brand}</h2>
			<button className="refresh-button" onClick={handleClick}>
				Refresh Coach
			</button>
		</div>
	);
};

export default Navbar;
