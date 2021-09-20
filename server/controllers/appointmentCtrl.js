module.exports = db => {
  const { success: rhs } = require('../authorization/requestHandler');
  const logError         = require('../utils/utils')(db).logError;

  return {
    create: (req, res) => {
      db.models.Appointment.create(req.body).then(() => {
        rhs(res)
      }).catch(e => logError(req.user, 'appointmentCtrl - create', e, res));
    },

    findAll: (req, res) => {
      res.json({id: 2});
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "Appointment" WHERE id = ${req.params.id}`, { type: db.QueryTypes.DELETE }).then(() => {
        rhs(res);
      }).catch(e => logError('req.user', 'appointmentCtrl - destroy', e, res));
    }
  }
}