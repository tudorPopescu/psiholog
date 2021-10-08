module.exports = db => {
  const logError = require('../utils/utils')(db).logError;

  return {
    getApiKey: (req, res) => {
      db.query(`SELECT maps_api_key FROM "User"`, { type: db.QueryTypes.SELECT }).then(resp => {
        res.send(resp[0].maps_api_key);
      }).catch(e => logError('userCtrl - getApiKey', e, res));
    }
  }
}
