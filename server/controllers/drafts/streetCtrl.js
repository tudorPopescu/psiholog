module.exports = db => {
  'use strict';
  const logError = require('../../utils/utils')(db).logError;

  return {
    findAll: (req, res) => {
      db.query(`SELECT s.id AS id_street, s.name AS street_name, s.id_village, t.name AS street_type_name
      FROM "Street" s
      LEFT JOIN "StreetType" t ON t.id = s.id_street_type
      WHERE s.id_village = ${req.params.id_village}`, {type: db.QueryTypes.SELECT}).then(resp => res.send(resp)).catch(e => logError(req.user, 'streetCtrl - findAll', e, res));
    }
  };
};