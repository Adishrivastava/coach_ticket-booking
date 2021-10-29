import React from 'react';
import CoachState from './context/ticketBooking/state';
import Homepage from './pages/homepage';
import './styles/App.css';

function App() {
	return (
		<CoachState>
			<div className="App">
				<Homepage />
			</div>
		</CoachState>
	);
}

export default App;
