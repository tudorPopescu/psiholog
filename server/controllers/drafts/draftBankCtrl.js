module.exports = db => {
  'use strict';
  const logError = require('../../utils/utils')(db).logError;

  return {
    findAll: (req, res) => {
      db.query('SELECT * FROM "DraftBank" ORDER BY name', {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp);
      }).catch(e => logError(req.user, 'findAll DraftBank', e, res));
    }
  };
};