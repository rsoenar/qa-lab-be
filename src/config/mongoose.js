const uri = 'mongodb://localhost:27017/iae_server';

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	poolSize: 10,
};

module.exports = {
	uri,
	options,
};
