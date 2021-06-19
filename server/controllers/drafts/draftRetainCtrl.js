module.exports = db => {
  'use strict';
  const logError = require('../../utils/utils')(db).logError;

  return {
    findAll: (req, res) => {
      db.query('SELECT * FROM "DraftRetain" ORDER BY name', {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp);
      }).catch(e => logError(req.user, 'findAll DraftRetain', e, res));
    }
  };
};