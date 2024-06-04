import moment from 'moment';

const today = new Date();

const dd = parseInt(String(today.getDate()).padStart(2, '0'));

const mm = parseInt(String(today.getMonth() + 1).padStart(2, '0'));

const yyyy = today.getFullYear();

const jakartaToday = new Date().setHours(today.getHours() + 7);

const jakartaDate = (date) => {
	if (date instanceof Date) {
		return date.setHours(today.getHours() + 7);
	}
	return null;
};

const formatDateDmmyyyy = (date) => {
	if (date instanceof Date) {
		return moment.utc(date).local().format('D MMMM YYYY');
	}
	return null;
};

const isValidYear = (year) => {
	if (isNaN(Number(year))) {
		return false;
	}

	return year.length === 4;
};

module.exports = {
	today,
	dd,
	mm,
	yyyy,
	jakartaToday,
	jakartaDate,
	formatDateDmmyyyy,
	isValidYear,
};
