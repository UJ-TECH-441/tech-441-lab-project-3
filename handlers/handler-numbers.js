// The faker-js module creates fake, random data
const { faker } = require('@faker-js/faker');

// The guessNumber() function will be called by the route-numbers.js route
module.exports.guessNumber = (min, max) => {
	const guess = faker.number.int({ min, max });
	return ({ guess });
}
