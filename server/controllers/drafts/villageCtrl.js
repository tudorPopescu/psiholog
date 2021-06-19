module.exports = db => {
  'use strict';
  const logError = require('../../utils/utils')(db).logError;

  return {
    findByIdCounty: (req, res) => {
      if (req.params.id_county && !isNaN(req.params.id_county)) {
        db.query(`SELECT v.id, v.name, v.id_locality, l.name AS locality, l.type_locality, l.type_village
        FROM "Village" v
        LEFT JOIN "Locality" l ON l.id = v.id_locality
        WHERE l.id_county = ${req.params.id_county} ORDER BY v.name`, {type: db.QueryTypes.SELECT}).then(resp => {
          res.json(resp);
        }).catch(e => logError(req.user, `findByCounty Village, id_county: ${req.params.id_county}`, e, res));
      } else {
        logError(req.user, `findByCounty Village, id_county: ${req.params.id_county}`, 'no or bad param', res);
      }
    }
  };
};