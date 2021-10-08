module.exports = app => {
  'use strict';
  const express      = require("express");
  const appPath      = __dirname + '/../app';
  const path         = require('path');
  const errors       = require('./errors');
  const requireLogin = require('./authorization/authentication').requireLogin;

  /* LOGIN */
  app.post('/login', require('./authorization/jwtInit')(app));

  /* Refresh Token */
  app.use('/api/refreshToken', requireLogin, require('./utils/refreshToken')(app));

  /* LogError */
  app.use('/api/logError', requireLogin, require('./routes/logError')(app));

  /* Appointment */
  app.use('/api/appointment', require('./routes/appointment')(app));

  /* Contact */
  app.use('/api/contact', require('./routes/contact')(app));

  /* User */
  app.use('/api/user', require('./routes/user')(app));

  app.route('*/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

  /* BUILD */
  app.use(express.static(path.join(appPath, 'build')));
  app.get('/*', (req, res) => res.sendFile(path.join(appPath, 'build', 'index.html')));

  app.route('*').get(errors[404]);
};
