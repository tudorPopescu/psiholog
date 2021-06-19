module.exports = db => {
  const {success: rhs} = require('../authorization/requestHandler');
  const {logAction: logAction, logError: logError} = require('../utils/utils')(db);


  return {
    create: (req, res) => {
      logAction(req.user.id, req.body.action, req.body.details);
      rhs(res);
    },

    findAll: (req, res) => {
      db.query(`SELECT concat(u.first_name, ' ', u.last_name) AS user, u.email, un.name, un.cui, a.action, a.details, is_report, TO_CHAR(a.date, 'DD.MM.YYYY') AS date, TO_CHAR(a.date, 'HH24:mm:ss') AS time
      FROM "LogAction" a
      LEFT JOIN "User" u ON u.id = a.id_user
      LEFT JOIN "Unit" un ON un.id = u.id_unit
      WHERE action <> 'LogIn' AND a.date::date >= '${req.params.start_date}' AND a.date::date <= '${req.params.end_date}'
      ORDER BY a.date DESC`, {type: db.QueryTypes.SELECT}).then(resp => res.send(resp)).catch(e => logError(req.user, 'logActionCtrl - findAll', e, res));
    }
  }
}