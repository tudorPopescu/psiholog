module.exports = db => {
  'use strict';
  const logError       = require('../../utils/utils')(db).logError;
  const {success: rhs} = require('../../authorization/requestHandler');

  return {
    findAll: (req, res) => {
      db.query(`SELECT * FROM "DraftDeduction"`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp);
      }).catch(e => logError(req.user, 'findAll DraftDeduction', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT * FROM "DraftDeduction" WHERE id = ${req.params.id}`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp);
      }).catch(e => logError(req.user, 'findAll DraftDeduction', e, res));
    },

    findByAmountNoPers: (req, res) => {
      db.query(`SELECT id, amount FROM "DraftDeduction"
      WHERE ${req.params.amount} >= amount_start AND ${req.params.amount} <= amount_end AND no_pers = ${req.params.no_pers} AND stop is null`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp);
      }).catch(e => logError(req.user, 'findByAmountNoPers DraftDeduction', e, res));
    },

    create: (req, res) => {
      db.models.DraftDeduction.create(req.body).then(resp => {
        rhs(res);
      }).catch(e => logError(req.user, 'create DraftDeduction', e, res));
    },

    update: (req, res) => {
      db.models.DraftDeduction.update(req.body, {where: {id: req.body.id}}).then(() => {
        rhs(res);
      }).catch(e => logError(req.user, 'update DraftDeduction', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "DraftDeduction" WHERE id = ${req.params.id}`).then(() => {
        rhs(res);
      }).catch(e => logError(req.user, 'update DraftDeduction', e, res));
    }
  };
};