module.exports = db => {
  'use strict';
  const {logError: logError}   =  require('../../utils/utils')(db);
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {success: rhs}         = require('../../authorization/requestHandler');

  return {
    create: (req, res) => {
      db.models.DraftFoundingSource.create(req.body).then(resp => {
        db.query(`INSERT INTO "DraftFoundingBudgetary" (id_draft_founding_source, id_draft_budgetary_sector)
        SELECT ${resp.id}, id
        FROM "DraftBudgetarySector"`, {type: db.QueryTypes.INSERT}).then(() => {
          logAction(req.user.id, 'draftFoundingSourceCtrl - create', 'Creare draft sursa de finantare id: ' + resp.id);
          rhs(res);
        }).catch(e => logError(req.user, 'draftFoundingSourceCtrl - insert DraftFoundingBudgetary', e, res));
      }).catch(e => logError(req.user, 'draftFoundingSourceCtrl - create DraftFoundingSource', e, res));
    },

    update: (req, res) => {
      db.models.DraftFoundingSource.update(req.body, {where: {id: req.body.id}}).then(() => {
        logAction(req.user.id, 'draftFoundingSourceCtrl - update sursa de finantare', 'Actualizare sursa de finantare in configurare admin id: ' + req.body.id);
        rhs(res)
      }).catch(e => logError(req.user, 'draftFoundingSourceCtrl - update', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT id, code, name FROM "DraftFoundingSource" WHERE id = ${req.params.id}`, {type: db.QueryTypes.SELECT}).then(resp => res.json(resp[0])).catch(e => logError(req.user, 'draftFoundingSourceCtrl - find', e, res));
    },

    findAll: (req, res) => {
      db.query(`SELECT id, code, name FROM "DraftFoundingSource"`, {type: db.QueryTypes.SELECT}).then(resp => res.json(resp)).catch(e => logError(req.user, 'draftFoundingSourceCtrl - findAll', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "DraftFoundingSource" WHERE id = ${req.params.id}`).then(() => {
        logAction(req.user.id, 'draftFoundingSourceCtrl - destroy', 'Sterge sursa de finantare din configurare admin');
        rhs(res)
      }).catch(e => logError(req.user, 'draftFoundingSourceCtrl - destroy', e, res));
    }
  }
}