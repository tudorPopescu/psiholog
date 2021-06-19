module.exports = db => {
  'use strict';
  const {logError: logError}   = require('../../utils/utils')(db);
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {success: rhs}         = require('../../authorization/requestHandler');

  return {
    create: (req, res) => {
      db.models.DraftOutgoing.create(req.body).then(resp => {
        logAction(req.user.id, 'draftOutgoingCtrl - create', 'creare cheltuiala id: ' + resp.id);
        rhs(res);
      }).catch(e => logError(req.user, 'draftOutgoingCtrl - create', e, res));
    },

    update: (req, res) => {
      db.models.DraftOutgoing.update(req.body, {where: {id: req.body.id}}).then(() => {
        logAction(req.user.id, 'draftOutgoingCtrl - update cheltuiala', 'Actualizare cheltuiala in configurare admin id: ' + req.body.id);
        rhs(res)
      }).catch(e => logError(req.user, 'draftOutgoingCtrl - update', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT id, name, title, article, paragraph, code_row, last_child, id_superior FROM "DraftOutgoing" WHERE id = ${req.params.id}`, {type: db.QueryTypes.SELECT}).then(resp => res.json(resp[0])).catch(e => logError(req.user, 'draftOutgoingCtrl - find', e, res));
    },

    findAll: (req, res) => {
      db.query(`SELECT id, name, title, article, paragraph, code_row, last_child, id_superior FROM "DraftOutgoing"`, {type: db.QueryTypes.SELECT}).then(resp => res.json(resp)).catch(e => logError(req.user, 'draftOutgoingCtrl - findAll', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "DraftOutgoing" WHERE id = ${req.params.id}`).then(() => {
        logAction(req.user.id, 'draftOutgoingCtrl - destroy', 'Sterge cheltuiala din configurare admin');
        rhs(res)
      }).catch(e => logError(req.user, 'draftOutgoingCtrl - destroy', e, res));
    }
  }
}
