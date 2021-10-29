// find if a element exist in array
const findElement = (array, element) => {
	return array.indexOf(element) > -1;
};

// add seats to ans array and return it
// takes a row of previous bookings, no of seats still required, and the no of seats in a row
const addSeats = (row, seats, no_of_seats) => {
	ans_row = [];

	i = 1;
	while (i <= no_of_seats && seats > 0) {
		if (!findElement(row, i)) {
			ans_row.push(i);
			seats--;
		}
		i++;
	}

	return ans_row;
};

// function to get the best seats from available seats
// it takes the old seats and the no of seats required and return the best seats
const findBestSeats = (arr, seats) => {
	best_ans = [];
	l = 100;
	ans = [];
	for (let x = 0; x < 12; x++) {
		ans.push([]);
	}

	for (let i = 0; i < 12; i++) {
		let r = [];
		best_arr = [...arr];
		new_ans = [];
		for (let x = 0; x < 12; x++) {
			new_ans.push([]);
		}
		if (i == 12) {
			r = addSeats(arr[i], seats, 3);
		} else {
			r = addSeats(arr[i], seats, 7);
		}

		best_arr[i] = [...r, ...arr[i]];
		new_ans[i] = [...r];

		if (r.length == seats) {
			l = 0;
			best_ans = [...best_arr];
			ans = [...new_ans];
			break;
		}

		let new_seats = seats - r.length;

		j = i - 1;
		k = i + 1;

		while (new_seats && (j >= 0 || k < 12)) {
			if (j >= 0 && k < 12) {
				if (best_arr[j].length > best_arr[k].length) {
					if (k < 11) {
						r = addSeats(arr[k], new_seats, 7);
						best_arr[k] = [...r, ...arr[k]];

						new_seats -= r.length;
						new_ans[k] = [...r];
						if (new_seats == 0) {
							if (l > k - (j + 1)) {
								l = k - (j + 1);
								best_ans = [...best_arr];
								ans = [...new_ans];
							}
							break;
						}
					}

					if (j >= 0) {
						r = addSeats(arr[j], new_seats, 7);
						best_arr[j] = [...r, ...arr[j]];

						new_seats -= r.length;
						new_ans[j] = [...r];
						if (new_seats == 0) {
							break;
						}
					}

					if (k == 11) {
						r = addSeats(arr[k], new_seats, 3);
						best_arr[k] = [...r, ...arr[k]];

						new_seats -= r.length;
						new_ans[k] = [...r];

						if (new_seats == 0) {
							break;
						}
					}
				} else {
					if (j >= 0) {
						r = addSeats(arr[j], new_seats, 7);
						best_arr[j] = [...r, ...arr[j]];

						new_seats -= r.length;
						new_ans[j] = [...r];
						if (new_seats == 0) {
							if (l > k - 1 - j) {
								l = k - 1 - j;
								best_ans = [...best_arr];
								ans = [...new_ans];
							}
							break;
						}
					}

					if (k < 11) {
						r = addSeats(arr[k], new_seats, 7);
						best_arr[k] = [...r, ...arr[k]];

						new_seats -= r.length;
						new_ans[k] = [...r];

						if (new_seats == 0) {
							break;
						}
					}

					if (k == 11) {
						r = addSeats(arr[k], new_seats, 3);
						best_arr[k] = [...r, ...arr[k]];

						new_seats -= r.length;
						new_ans[k] = [...r];

						if (new_seats == 0) {
							break;
						}
					}
				}
			} else {
				if (j >= 0) {
					r = addSeats(arr[j], new_seats, 7);
					best_arr[j] = [...r, ...arr[j]];

					new_seats -= r.length;
					new_ans[j] = [...r];
					if (new_seats == 0) {
						if (l > k - 1 - j) {
							l = k - 1 - j;
							best_ans = [...best_arr];
							ans = [...new_ans];
						}
						break;
					}
				}

				if (k < 11) {
					r = addSeats(arr[k], new_seats, 7);
					best_arr[k] = [...r, ...arr[k]];

					new_seats -= r.length;
					new_ans[k] = [...r];

					if (new_seats == 0) {
						break;
					}
				}

				if (k == 11) {
					r = addSeats(arr[k], new_seats, 3);
					best_arr[k] = [...r, ...arr[k]];

					new_seats -= r.length;
					new_ans[k] = [...r];

					if (new_seats == 0) {
						break;
					}
				}
			}
			j--;
			k++;
		}

		if (Math.min(k, 11) - Math.max(j, 0) < l) {
			l = Math.min(k, 11) - Math.max(j, 0);
			best_ans = [...best_arr];
			ans = [...new_ans];
		}
	}

	// console.log('\n \n \n', best_ans, 'ans - ', ans);
	for (let i = 0; i < 12; i++) {
		best_ans[i].sort();
		ans[i].sort();
	}

	return { new_seatings: best_ans, newly_booked_seats: ans };
};

module.exports = findBestSeats;

// arr = [
// 	[1, 2, 3, 4, 5, 7],
// 	[1, 2, 3, 4, 7],
// 	[1, 2, 3],
// 	[1, 2, 3],
// 	[],
// 	[1, 2, 3, 4, 5, 6, 7],
// 	[1, 6, 7],
// 	[6, 7],
// 	[1, 2, 3, 4, 5, 6, 7],
// 	[1, 2, 3, 4, 5, 6, 7],
// 	[4, 5, 6, 7],
// 	[1, 6, 7],
// 	[1, 2],
// ];

// findBestSeats(arr, 7);
