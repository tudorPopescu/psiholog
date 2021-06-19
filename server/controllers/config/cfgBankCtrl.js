module.exports = db => {
  const {success: rhs}         = require('../../authorization/requestHandler');
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {logError: logError}   = require('../../utils/utils')(db);

  return {
    findAll: (req, res) => {
      db.query(`SELECT id, name, iban FROM "CfgBank" WHERE id_unit = ${req.user.id_unit}`, {type: db.QueryTypes.SELECT}).then(resp => res.send(resp)).catch(e => logError(req.user, 'cfgBankCtrl - findAll', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT id, name, iban, id_draft_bank FROM "CfgBank" WHERE id = ${req.params.id}`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp.length ? resp[0]:{});
      }).catch(e => logError(req.user, 'cfgBankCtrl - find', e, res));
    },

    create: (req, res) => {
      req.body.id_unit = req.user.id_unit;
      db.models.CfgBank.create(req.body).then(() => {
        logAction(req.user.id, 'cfgBankCtrl - create bank', 'Creare banka in configurare client');
        rhs(res);
      }).catch(e => logError(req.user, 'cfgBankCtrl - create bank', e, res));
    },

    update: (req, res) => {
      db.models.CfgBank.update(req.body, {where: {id: req.body.id}}).then(() => {
        logAction(req.user.id, 'cfgBankCtrl - update bank', 'Actualizare banka in configurare client');
        rhs(res);
      }).catch(e => logError(req.user, 'cfgBankCtrl - update bank', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "CfgBank" WHERE id = ${req.params.id}`, {type: db.QueryTypes.DELETE}).then(() => {
        logAction(req.user.id, 'cfgBankCtrl - destroy bank', 'Sterge banka in configurare client');
        rhs(res);
      }).catch(e => logError(req.user, 'cfgBankCtrl - destroy', e, res));
    }
  }
}