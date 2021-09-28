module.exports = db => {
  const { success: rhs } = require('../authorization/requestHandler');
  const logError         = require('../utils/utils')(db).logError;

  return {
    create: (req, res) => {
      db.models.Appointment.create(req.body).then(() => {
        rhs(res)
      }).catch(e => logError('appointmentCtrl - create', e, res));
    },

    findAll: (req, res) => {
      db.query(`SELECT id, first_name, last_name, email, phone, TO_CHAR(date, 'dd.MM.yyyy') AS date_view, date FROM "Appointment" ORDER BY date DESC`, { type: db.QueryTypes.SELECT }).then(resp => {
        res.send(resp);
      }).catch(e => logError('appointmentCtrl - findAll', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "Appointment" WHERE id = ${req.params.id}`, { type: db.QueryTypes.DELETE }).then(() => {
        rhs(res);
      }).catch(e => logError('appointmentCtrl - destroy', e, res));
    }
  }
}