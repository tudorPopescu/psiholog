module.exports = db => {
  const {success: rhs} = require('../authorization/requestHandler');
  const logError = require('../utils/utils')(db).logError;

  return {
    create: (req, res) => db.models.LogError.create(req.body).then(() => rhs(res)).catch(e => logError('logErrorCtrl - create', e, res)),

    findAll: (req, res) => {
      db.query(`SELECT l.id, l.action, l.error, l."createdAt"
      FROM "LogError" l
      ORDER BY l.id DESC`, {type: db.QueryTypes.SELECT}).then(resp => res.send(resp)).catch(e => logError('logErrorCtrl - findAll', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT l.action, l.error, l.detail
      FROM "LogError" l
      WHERE l.id = ${req.params.id}`, {type: db.QueryTypes.SELECT}).then(resp => res.send(resp[0])).catch(e => logError(req.user, 'logErrorCtrl - find', e, res));
    },

    destroyAll: (req, res) => {
      db.query(`DELETE FROM "LogError"`).then(() => {
        rhs(res);
      }).catch(e => logError('logErrorCtrl - destroyAll', e, res));
    },

    destroy: (req, res) => db.query(`DELETE FROM "LogError" WHERE id = ${req.params.id}`).then(() => rhs(res)).catch(e => logError('logErrorCtrl - destroy', e, res))
  };
};
