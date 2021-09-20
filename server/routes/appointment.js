module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../controllers/appointmentCtrl')(app.locals.db);
  const router  = express.Router();

  router.post('/', ctrl.create);
  router.get('/', ctrl.findAll);
  router.delete('/:id', ctrl.destroy);

  return router;
};
