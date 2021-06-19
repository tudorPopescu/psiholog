module.exports = app => {
  'use strict';
  const express    = require('express');
  const adminCtrl  = require('../controllers/user/adminUserCtrl')(app.locals.db);
  const clientCtrl = require('../controllers/user/clientUserCtrl')(app.locals.db);
  const router     = express.Router();

  /* ADMIN */
  router.post('/admin', adminCtrl.create);
  router.put('/admin', adminCtrl.update);
  router.get('/admin', adminCtrl.findAll);
  router.get('/admin/:id', adminCtrl.find);
  router.delete('/admin/:id', adminCtrl.destroy);

  /* CLIENT */
  router.get('/client', clientCtrl.findAll);

  return router;
};
