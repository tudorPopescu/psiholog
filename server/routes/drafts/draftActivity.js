module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../../controllers/drafts/draftActivityCtrl')(app.locals.db);
  const router  = express.Router();

  router.post('/', ctrl.create);
  router.put('/', ctrl.update);
  router.get('/:id', ctrl.find);
  router.get('/', ctrl.findAll);
  router.delete('/:id', ctrl.destroy);

  return router;
};
