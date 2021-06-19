module.exports = db => {
  const {success: rhs}         = require('../../authorization/requestHandler');
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {logError: logError}   = require('../../utils/utils')(db);
  const _                      = require('lodash');
  const async                  = require('async');

  return {
    findAll: (req, res) => {
      db.query(`SELECT c.id, c.name, array_to_string(array_agg(p.name), ', ') AS payroll
        FROM "CfgPayRollCentralizing" c
        LEFT JOIN "CfgPayRollJunction" j ON j.id_cfg_payroll_centralizing = c.id
        LEFT JOIN "CfgPayRoll" p ON p.id = j.id_cfg_payroll
        WHERE p.id_unit = ${req.user.id_unit} GROUP BY c.id ORDER BY c.id`, {type: db.QueryTypes.SELECT}).then(resp => {
          res.json(resp);
        }).catch(e => logError(req.user, 'cfgPayRollCentralizingCtrl - findAll', e, res));
    },

    find: (req, res) => {
      db.query(`SELECT c.id, c.name, to_json(array_agg(j.* ORDER BY j.id)) AS payrolls FROM "CfgPayRollCentralizing" c
        LEFT JOIN "CfgPayRollJunction" j ON j.id_cfg_payroll_centralizing = c.id
        WHERE c.id = ${req.params.id} GROUP BY c.id`, {type: db.QueryTypes.SELECT}).then(resp => {
          res.json(resp.length ? resp[0]:{});
        }).catch(e => logError(req.user, 'cfgPayRollCentralizingCtrl - find', e, res));
    },

    create: (req, res) => {
      req.body.id_unit = req.user.id_unit;
      db.models.CfgPayRollCentralizing.create(req.body).then(resp => {
        for (let i = req.body.payrolls.length-1; i >= 0; i--) {
          req.body.payrolls[i].id_cfg_payroll_centralizing = resp.id;
        }
        db.models.CfgPayRollJunction.bulkCreate(req.body.payrolls).then(() => {
          logAction(req.user.id, 'cfgPayRollCtrl - create CfgPayRoll', 'Creare config');
          rhs(res);
        }).catch(e => logError(req.user, 'cfgPayRollCentralizingCtrl - bulk create', e, res));
      }).catch(e => logError(req.user, 'cfgPayRollCentralizingCtrl - create', e, res));
    },

    update: (req, res) => {
      let tasks = [];

      tasks.push(cb => {
        db.models.CfgPayRollCentralizing.update(req.body, {where: {id: req.body.id}}).then(() => cb()).catch(e => cb(e));
      });

      if (req.body.toCreate && req.body.toCreate.length) {
        tasks.push(cb => {
          for (let i = req.body.toCreate.length-1; i >= 0; i--) {
            req.body.toCreate[i].id_cfg_payroll_centralizing = req.body.id;
          }
          db.models.CfgPayRollJunction.bulkCreate(req.body.toCreate).then(() => cb()).catch(e => cb(e));
        });
      }

      if (req.body.toDelete && req.body.toDelete.length) {
        tasks.push(cb => {
          db.query(`DELETE FROM "CfgPayRollJunction" WHERE id in (${req.body.toDelete})`).then(() => cb()).catch(e => cb(e));
        });
      }

      async.parallel(tasks, err => {
        if (err) {
          logError(req.user, 'cfgPayRollCentralizingCtrl - update', e, res);
        } else {
          rhs(res);
        }
      });
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "CfgPayRollCentralizing" WHERE id = ${req.params.id}`).then(() => {
        logAction(req.user.id, 'CfgPayRollCentralizing - sterge CfgPayRollCentralizing', 'sterge config');
        rhs(res);
      }).catch(e => logError(req.user, 'CfgPayRollCentralizing - delete', e, res));
    }
  }
}