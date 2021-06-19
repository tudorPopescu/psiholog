module.exports = db => {
  const {success: rhs}         = require('../../authorization/requestHandler');
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {logError: logError}   = require('../../utils/utils')(db);
  const _                      = require('lodash');
  const async                  = require('async');

  return {
    findAll: (req, res) => {
      db.query(`SELECT p.id, concat(s.code, f.code, ' - ', a.code, ' ', a.name) AS founding, c.name AS compartment, p.name
        FROM "CfgPayRoll" p
        LEFT JOIN "CfgCompartment" c ON c.id = p.id_cfg_compartment
        LEFT JOIN "CfgFoundingBudgetary" fb ON fb.id = p.id_cfg_founding_budgetary
        LEFT JOIN "DraftFoundingBudgetaryActivity" ba ON ba.id = fb.id_draft_founding_budgetary_activity
        LEFT JOIN "DraftActivity" a ON a.id = ba.id_draft_activity
        LEFT JOIN "DraftFoundingBudgetary" b ON b.id = ba.id_draft_founding_budgetary
        LEFT JOIN "DraftBudgetarySector" s ON s.id = b.id_draft_budgetary_sector
        LEFT JOIN "DraftFoundingSource" f ON f.id = b.id_draft_founding_source
        WHERE p.id_unit = ${req.user.id_unit}`, {type: db.QueryTypes.SELECT}).then(resp => {
          res.json(resp);
        }).catch(e => logError(req.user, 'cfgPayRollCtrl - findAll', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT id, name, id_cfg_founding_budgetary, id_cfg_compartment FROM "CfgPayRoll" WHERE id = ${req.params.id}`).then(resp => {
        res.json(resp[0].length ? resp[0]:{});
      }).catch(e => logError(req.user, 'cfgPayRollCtrl - find', e, res));
    },

    create: (req, res) => {
      req.body.id_unit = req.user.id_unit;
      db.models.CfgPayRoll.create(req.body).then(() => {
        logAction(req.user.id, 'cfgPayRollCtrl - create CfgPayRoll', 'Creare config');
        rhs(res);
      }).catch(e => logError(req.user, 'cfgPayRollCtrl - create', e, res));
    },

    update: (req, res) => {
      db.models.CfgPayRoll.update(req.body, {where: {id: req.body.id}}).then(() => {
        logAction(req.user.id, 'cfgPayRollCtrl - actualizeaza CfgPayRoll', 'actualizeaza config');
        rhs(res);
      }).catch(e => logError(req.user, 'cfgPayRollCtrl - update', e, res));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "CfgPayRoll" WHERE id = ${req.params.id}`).then(() => {
        logAction(req.user.id, 'cfgPayRollCtrl - sterge CfgPayRoll', 'sterge config');
        rhs(res);
      }).catch(e => logError(req.user, 'cfgPayRollCtrl - delete', e, res));
    }
  }
}