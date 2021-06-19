module.exports = app => {
	'use strict';
	const express      = require("express");
	const appPath      = __dirname + '/../app';
	const path         = require('path');
	const errors       = require('./errors');
	const requireLogin = require('./authorization/authentication').requireLogin;

	/* LOGIN */
	app.post('/login', require('./authorization/jwtInit')(app));
	// app.use('/api/refreshToken', requireLogin, require('./utils/refreshToken')(app));

	/* USER */
	app.use('/api/user', requireLogin, require('./routes/user')(app));

	/* LogError / logAction */
	app.use('/api/logError', requireLogin, require('./routes/logError')(app));
	app.use('/api/logAction', requireLogin, require('./routes/logAction')(app));

	/* ADDRESS */
	app.use('/api/country', requireLogin, require('./routes/drafts/country')(app));
	app.use('/api/county', requireLogin, require('./routes/drafts/county')(app));
	app.use('/api/village', requireLogin, require('./routes/drafts/village')(app));
	app.use('/api/street', requireLogin, require('./routes/drafts/street')(app));

	/* DRAFTS */
	app.use('/api/draftBank', requireLogin, require('./routes/drafts/draftBank')(app));
  app.use('/api/draftFoundingSource', requireLogin, require('./routes/drafts/draftFoundingSource')(app));
  app.use('/api/draftBudgetarySector', requireLogin, require('./routes/drafts/draftBudgetarySector')(app));
  app.use('/api/draftActivity', requireLogin, require('./routes/drafts/draftActivity')(app));
  app.use('/api/draftFoundingBudgetary', requireLogin, require('./routes/drafts/draftFoundingBudgetary')(app));
  app.use('/api/draftOutgoing', requireLogin, require('./routes/drafts/draftOutgoing')(app));
  app.use('/api/draftRetain', requireLogin, require('./routes/drafts/draftRetain')(app));
  app.use('/api/draftDeduction', requireLogin, require('./routes/drafts/draftDeduction')(app));
  app.use('/api/draftFreeDays', requireLogin, require('./routes/drafts/draftFreeDays')(app));

	/* CONFIG */
	app.use('/api/cfgBank', requireLogin, require('./routes/config/cfgBank')(app));
	app.use('/api/cfgFoundingBudgetary', requireLogin, require('./routes/config/cfgFoundingBudgetary')(app));
	app.use('/api/cfgCompartment', requireLogin, require('./routes/config/cfgCompartment')(app));
	app.use('/api/cfgPayRoll', requireLogin, require('./routes/config/cfgPayRoll')(app));
	app.use('/api/cfgPayRollCentralizing', requireLogin, require('./routes/config/cfgPayRollCentralizing')(app));
	app.use('/api/cfgRetain', requireLogin, require('./routes/config/cfgRetain')(app));


	app.route('*/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

	/* BUILD */
	app.use(express.static(path.join(appPath, 'build')));
	app.get('/*', (req, res) => res.sendFile(path.join(appPath, 'build', 'index.html')));

	app.route('*').get(errors[404]);
};
