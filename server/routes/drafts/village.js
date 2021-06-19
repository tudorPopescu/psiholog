module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../../controllers/drafts/villageCtrl')(app.locals.db);
  const router  = express.Router();

  router.get('/byIdCounty/:id_county', ctrl.findByIdCounty);

  return router;
};
