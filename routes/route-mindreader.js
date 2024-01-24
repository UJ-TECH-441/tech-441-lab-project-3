const express = require('express');
const handler = require('../handlers/handler-mindreader');

module.exports = app => {

	app.get('/readmymind', async (req, res, next) => {
		try {
			const messages = handler.read();
			res.json({ messages });
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

	app.get('/rating', async (req, res, next) => {
		try {
			const messages = handler.rating(req.query.stars);
			res.json({ messages });
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

};
