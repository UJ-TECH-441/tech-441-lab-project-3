const store = require('../data/store');

module.exports.categories = { predictions: 'predictions', numbers: 'numbers' };

module.exports.score = (category, correct) => {
	store.score[category].votes++;
	if (correct) store.score[category].correct++;
	return ({ votes: store.score[category].votes, correct: store.score[category].correct });
};
