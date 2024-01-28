const express = require('express');
const handler = require('../handlers/handler-score');

module.exports = app => {
	// POST request for user to send correct/incorrect feedback
	app.post('/score', async (req, res, next) => {
		try {
			// Ensure that the category is valid
			if (!handler.categories[req.body.category]) return res.sendStatus(400);
			// Call handler
			const result = handler.score(req.body.category, req.body.correct);
			// Return the JSON result
			res.json(result);
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

};
