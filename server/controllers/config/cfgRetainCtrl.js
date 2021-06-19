module.exports = db => {
  const {success: rhs}         = require('../../authorization/requestHandler');
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {logError: logError}   = require('../../utils/utils')(db);

  return {
    findAll: (req, res) => {
      db.query(`SELECT id, name, month_rate, start, stop, percent FROM "CfgRetain" WHERE id_unit = ${req.user.id_unit}`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp);
      }).catch(e => logError(req.user, 'cfgRetainCtrl - findAll', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT * FROM "CfgRetain" WHERE id = ${req.params.id}`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp.length ? resp[0]:{});
      }).catch(e => logError(req.user, 'cfgRetainCtrl - find', e, res));
    },

    create: (req, res) => {
      req.body.id_unit = req.user.id_unit;
      db.models.CfgRetain.create(req.body).then(() => {
        logAction(req.user.id, 'cfgRetainCtrl - create retinere', 'Creare retinere in configurare client');
        rhs(res);
      }).catch(e => logError(req.user, 'cfgRetainCtrl - create retinere', e, res));
    },

    update: (req, res) => {
      db.models.CfgRetain.update(req.body, {where: {id: req.body.id}}).then(() => {
        logAction(req.user.id, 'cfgRetainCtrl - update retinere', 'Actualizare retinere in configurare client');
        rhs(res);
      }).catch(e => logError(req.user, 'cfgRetainCtrl - update retinere', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "CfgRetain" WHERE id = ${req.params.id}`, {type: db.QueryTypes.DELETE}).then(() => {
        logAction(req.user.id, 'cfgRetainCtrl - destroy retinere', 'Sterge retinere in configurare client');
        rhs(res);
      }).catch(e => logError(req.user, 'cfgRetainCtrl - destroy', e, res));
    }
  }
}