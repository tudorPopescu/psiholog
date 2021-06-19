module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../../controllers/drafts/streetCtrl')(app.locals.db);
  const router  = express.Router();

  router.get('/findAll/:id_village', ctrl.findAll);

  return router;
};
