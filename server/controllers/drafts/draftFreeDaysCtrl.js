module.exports = db => {
  'use strict';
  const logError = require('../../utils/utils')(db).logError;
  const {success: rhs}         = require('../../authorization/requestHandler');

  return {
    findAll: (req, res) => {
      let year = new Dat(req.user.current_month).getFullYear();
      db.query(`SELECT id, date, name, year FROM "DraftFreeDays" WHERE year = ${year}`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp);
      }).catch(e => logError(req.user, 'find DraftFreeDays', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT id, date, name, year FROM "DraftFreeDays" WHERE id = ${req.params.id}`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.json(resp.length ? resp[0]:{});
      }).catch(e => logError(req.user, 'find DraftFreeDays', e, res));
    },

    create: (req, res) => {
      req.body.year = new Dat(req.user.current_month).getFullYear();
      db.models.DraftFreeDays.create(req.body).then(() => {
        rhs(res);
      }).catch(e => logError(req.user, 'create DraftFreeDays', e, res));
    },

    update: (req, res) => {
      db.models.DraftFreeDays.update(req.body, {where: {id: req.body.id}}).then(() => {
        rhs(res);
      }).catch(e => logError(req.user, 'update DraftFreeDays', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "DraftFreeDays" WHERE id = ${req.params.id}`).then(() => {
        rhs(res);
      }).catch(e => logError(req.user, 'update DraftFreeDays', e, res));
    }
  };
};