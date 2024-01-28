// The faker-js module creates fake, random data
const { faker } = require('@faker-js/faker');

// The read() function will be called by the index.js route
module.exports.makePredictions = () =>
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
