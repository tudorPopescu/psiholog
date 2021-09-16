module.exports = app => {
	'use strict';
	const express      = require("express");
	const appPath      = __dirname + '/../app';
	const path         = require('path');
	const errors       = require('./errors');
	const requireLogin = require('./authorization/authentication').requireLogin;

	/* LOGIN */
	app.post('/login', require('./authorization/jwtInit')(app));

	/* USER */
	app.use('/api/user', requireLogin, require('./routes/user')(app));

	/* LogError / logAction */
	app.use('/api/logError', requireLogin, require('./routes/logError')(app));
	app.use('/api/logAction', requireLogin, require('./routes/logAction')(app));

	/* Appointment */
	app.use('/api/appointment', requireLogin, require('./routes/appointment')(app));

	/* Service */
	app.use('/api/service', requireLogin, require('./routes/service')(app));

	/* Contact */
	app.use('/api/contact', require('./routes/contact')(app));

	app.route('*/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

	/* BUILD */
	app.use(express.static(path.join(appPath, 'build')));
	app.get('/*', (req, res) => res.sendFile(path.join(appPath, 'build', 'index.html')));

	app.route('*').get(errors[404]);
};
