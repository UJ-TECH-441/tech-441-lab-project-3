// The faker-js module creates fake, random data
const { faker } = require('@faker-js/faker');

// Keep a running total of these counts
let votes = 0;
let totalStars = 0;

// The read() function will be called by the index.js route
module.exports.read = () =>
	[
		// Create some horribly wrong predictions
		{
			prediction: 'Your name is',
			value: faker.person.fullName(),
		},
		{
			prediction: 'You live in',
			value: `${faker.location.city()}, ${faker.location.state({abbreviated: true})}`,
		},
		{
			prediction: 'You work for',
			value: faker.company.name()
		}
	];

// The rating() function will be called by the index.js route
// It expects one parameter called stars
module.exports.rating = stars => {
	// Stars will be received as a string parameter, so convert it to a number
	stars = parseInt(stars);
	console.log(`Rating of ${stars} received`);
	// Increment the vote total and overall total of stars
	votes++;
	totalStars += stars;
	// Return JSON object
	return {
		votes, // Total # of votes
		ratingAvg: totalStars / votes // Average rating
	};
}