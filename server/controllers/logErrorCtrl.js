module.exports = db => {
  const {success: rhs} = require('../authorization/requestHandler');
  const logError = require('../utils/utils')(db).logError;

  return {
    create: (req, res) => db.models.LogError.create(req.body).then(() => rhs(res)).catch(e => logError(req.user, 'logErrorCtrl - create', e, res)),

    findAll: (req, res) => {
      db.query(`SELECT l.id, n.name, l.action, l.error, l."createdAt"
      , CASE WHEN l.id_user IS NOT NULL THEN l.id_user ELSE l.id_employee END AS id_user
      , CASE WHEN l.id_user IS NOT NULL THEN u.email ELSE e.email END AS email
      FROM "LogError" l
      LEFT JOIN "User" u ON u.id = l.id_user
      LEFT JOIN "Employee" e ON e.id = l.id_employee
      LEFT JOIN "Unit" n ON n.id = u.id_unit OR n.id = e.id_unit`, {type: db.QueryTypes.SELECT}).then(resp => res.send(resp)).catch(e => logError(req.user, 'logErrorCtrl - findAll', e, res));
    },

    destroyAll: (req, res) => db.query(`DELETE FROM "LogError`).then(() => rhs(res)).catch(e => logError(req.user, 'logErrorCtrl - destroyAll', e, res)),

    destroy: (req, res) => db.query(`DELETE FROM "LogError" WHERE id = ${req.params.id}`).then(() => rhs(res)).catch(e => logError(req.user, 'logErrorCtrl - destroy', e, res))
  };
};
