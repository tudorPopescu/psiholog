module.exports = db => {
  'use strict';
  const {logError: logError}   = require('../../utils/utils')(db);
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {success: rhs}         = require('../../authorization/requestHandler');

  return {
    create: (req, res) => {
      db.query(`SELECT id FROM "DraftActivity" WHERE code_row = ${req.body.code_row}`, {type: db.QueryTypes.SELECT}).then(ac => {
        if (ac.length) {
          db.query(`UPDATE "DraftActivity" SET code_row = (code_row + 1) WHERE code_row >= ${req.body.code_row}`, {type: db.QueryTypes.SELECT}).then(() => {
            db.models.DraftActivity.create(req.body).then(resp => {
              logAction(req.user.id, 'draftActivityCtrl - create', 'creare activitate id: ' + resp.id);
              req.body.id_draft_activity = resp.id;

              db.models.DraftFoundingBudgetaryActivity.create(req.body).then(draft => {
                logAction(req.user.id, 'draftActivityCtrl - create', 'creare draft founding budgetary activity id: ' + draft.id);
                rhs(res);
              }).catch(e => logError(req.user, 'draftActivityCtrl - create founding budgetary activity', e, res));
            }).catch(e => logError(req.user, 'draftActivityCtrl - create activity', e, res));
          }).catch(e => logError(req.user, 'draftActivityCtrl - update code_row', e, res));
        } else {
          db.models.DraftActivity.create(req.body).then(resp => {
            logAction(req.user.id, 'draftActivityCtrl - create', 'creare activitate id: ' + resp.id);
            req.body.id_draft_activity = resp.id;

            db.models.DraftFoundingBudgetaryActivity.create(req.body).then(draft => {
              logAction(req.user.id, 'draftActivityCtrl - create', 'creare draft founding budgetary activity id: ' + draft.id);
              rhs(res);
            }).catch(e => logError(req.user, 'draftActivityCtrl - create founding budgetary activity', e, res));
          }).catch(e => logError(req.user, 'draftActivityCtrl - create activity', e, res));
        }
      }).catch(e => logError(req.user, 'draftActivityCtrl - find code_row', e, res));
    },

    update: (req, res) => {
      if (req.body.old_code_row < req.body.code_row) {
        db.query(`UPDATE "DraftActivity" SET code_row = (code_row - 1) WHERE code_row >= ${req.body.old_code_row} AND code_row <= ${req.body.code_row}`).then(() => {
          db.DraftActivity.update(req.body, {where: {id: req.body.id}}).then(() => {
            rhs(res);
          }).catch(err => logError(req.user, 'update draft activity', err, res));
        }).catch(err => logError(req.user, 'update DraftActivity only code_row', err, res));
      } else if (req.body.old_code_row > req.body.code_row) {
        db.query(`UPDATE "DraftActivity" SET code_row = (code_row + 1) WHERE code_row >= ${req.body.code_row} AND code_row <= ${req.body.old_code_row}`).then(() => {
          db.DraftActivity.update(req.body, {where: {id: req.body.id}}).then(() => {
            rhs(res);
          }).catch(err => saveError(req.user, 'update draft activity', err, res));
        }).catch(err => saveError(req.user, 'update DraftActivity only code_row', err, res));
      } else {
        db.models.DraftActivity.update(req.body, {where: {id: req.body.id}}).then(() => {
          logAction(req.user.id, 'draftActivityCtrl - update activitate', 'Actualizare activitate in configurare admin id: ' + req.body.id);
          rhs(res)
        }).catch(e => logError(req.user, 'draftActivityCtrl - update', e, res));
      }
    },

    find: (req, res) => {
      db.query(`SELECT id, code, name, last_child, code_row, id_superior FROM "DraftActivity" WHERE id = ${req.params.id}`, {type: db.QueryTypes.SELECT}).then(resp => res.json(resp[0])).catch(e => logError(req.user, 'draftActivityCtrl - find', e, res));
    },

    findAll: (req, res) => {
      db.query(`SELECT id, code, name, id_superior, last_child, code_row FROM "DraftActivity" ORDER BY code_row`, {type: db.QueryTypes.SELECT}).then(resp => res.json(resp)).catch(e => logError(req.user, 'draftActivityCtrl - findAll', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "DraftActivity" WHERE id = ${req.params.id}`).then(() => {
        db.sequelize.query('UPDATE "DraftActivity" SET code_row = (code_row - 1) WHERE code_row >= ' + req.body.code_row).then(() => {
          logAction(req.user.id, 'draftActivityCtrl - destroy', 'Sterge activitate din configurare admin');
          rhs(res);
        }).catch(err => saveError(req.user, 'update DraftActivity only code_row for destroy', err, res));
      }).catch(e => logError(req.user, 'draftActivityCtrl - destroy', e, res));
    }
  }
}
