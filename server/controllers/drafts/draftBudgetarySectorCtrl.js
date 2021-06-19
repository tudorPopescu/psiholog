module.exports = db => {
  'use strict';
  const {logError: logError}   = require('../../utils/utils')(db);
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {success: rhs}         = require('../../authorization/requestHandler');

  return {
    create: (req, res) => {
      db.models.DraftBudgetarySector.create(req.body).then(resp => {
        db.query(`INSERT INTO "DraftFoundingBudgetary" (id_draft_founding_source, id_draft_budgetary_sector)
        SELECT id, ${resp.id}
        FROM "DraftFoundingSource"`, {type: db.QueryTypes.INSERT}).then(() => {
          logAction(req.user.id, 'draftBudgetarySectorCtrl - create', 'Creare draft sector bugetar id: ' + resp.id);
          rhs(res);
        }).catch(e => logError(req.user, 'draftBudgetarySectorCtrl - insert DraftFoundingBudgetary', e, res));
      }).catch(e => logError(req.user, 'draftBudgetarySectorCtrl - create DraftBudgetarySector', e, res));
    },

    update: (req, res) => {
      db.models.DraftBudgetarySector.update(req.body, {where: {id: req.body.id}}).then(() => {
        logAction(req.user.id, 'draftBudgetarySectorCtrl - update sector bugetar', 'Actualizare sector bugetar in configurare admin id: ' + req.body.id);
        rhs(res)
      }).catch(e => logError(req.user, 'draftBudgetarySectorCtrl - update', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT id, code, name, old_code, iban_code FROM "DraftBudgetarySector" WHERE id = ${req.params.id}`, {type: db.QueryTypes.SELECT}).then(resp => res.json(resp[0])).catch(e => logError(req.user, 'draftBudgetarySectorCtrl - find', e, res));
    },

    findAll: (req, res) => {
      db.query(`SELECT id, code, iban_code, name FROM "DraftBudgetarySector"`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp);
      }).catch(e => logError(req.user, 'draftBudgetarySectorCtrl - findAll', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "DraftFoundingBudgetary" WHERE id = ${req.params.id}`).then(() => {
        logAction(req.user.id, 'draftFoundingBudgetaryCtrl - destroy', 'Sterge sector bugetar din configurare admin');
        rhs(res)
      }).catch(e => logError(req.user, 'draftFoundingBudgetaryCtrl - destroy', e, res));
    }
  }
}