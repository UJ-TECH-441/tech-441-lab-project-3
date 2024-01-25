const express = require('express');
const handler = require('../handlers/handler-numbers');

module.exports = app => {

	app.get('/numbers/guess', async (req, res, next) => {
		try {
			if (!req.query.min || !req.query.max) {
				return res.status(400).send('min and max are required');
			}
			const min = parseInt(req.query.min || 1);
			const max = parseInt(req.query.max || 100);
			const guess = handler.guess(min, max);
			res.json(guess);
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

	app.post('/numbers/guess', async (req, res, next) => {
		try {
			if (!req.body.min || !req.body.max) {
				return res.status(400).send('min and max are required');
			}
			const min = parseInt(req.body.min || 1);
			const max = parseInt(req.body.max || 100);
			const guess = handler.guess(min, max);
			res.json(guess);
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

	app.post('/numbers/vote', async (req, res, next) => {
		try {
			const result = handler.vote(req.body.correct);
			res.json(result);
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

};
