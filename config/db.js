const mongoose = require('mongoose');

const connectDB = async () => {
	console.log(process.env.MONGO_URI);

	await mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		})
		.then((conn) => {
			console.log(conn.connection.host);
		})
		.catch((err) => {
			console.log('ERR -> ', err);
		});
};

module.exports = connectDB;
