module.exports = db => {
  'use strict';
  const logError = require('../../utils/utils')(db).logError;

  return {
    findAll: (req, res) => {
      db.query('SELECT id, name FROM "County" ORDER BY name', {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp);
      }).catch(e => logError(req.user, 'findAll County', e, res));
    }
  };
};