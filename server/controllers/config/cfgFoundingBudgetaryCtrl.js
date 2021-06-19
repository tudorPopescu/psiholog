module.exports = db => {
  const {success: rhs}         = require('../../authorization/requestHandler');
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {logError: logError}   = require('../../utils/utils')(db);
  const async                  = require('async');
  const _                      = require('lodash');

  return {
    findAll: (req, res) => {
      let tasks = [], founding, draft, sectors;
      tasks.push(cb => {
        db.query(`SELECT code, name FROM "DraftBudgetarySector" ORDER BY id`, {type: db.QueryTypes.SELECT}).then(resp => {
          sectors = resp;
          cb();
        }).catch(e => cb(e));
      });

      tasks.push(cb => {
        db.query(`SELECT f.code, f.name, TO_JSON(ARRAY_AGG(d.* ORDER BY d.id)) AS data
          FROM "DraftFoundingBudgetary" d
          LEFT JOIN "DraftFoundingSource" f ON f.id = d.id_draft_founding_source
          GROUP BY f.id ORDER BY f.id`, {type: db.QueryTypes.SELECT}).then(resp => {
            founding = resp;
            cb();
          }).catch(e => cb(e));
      });

      tasks.push(cb => {
        db.query(`SELECT DISTINCT a.id_draft_founding_budgetary
          FROM "CfgFoundingBudgetary" c
          LEFT JOIN "DraftFoundingBudgetaryActivity" a ON a.id = c.id_draft_founding_budgetary_activity
          WHERE c.id_unit = ${req.user.id_unit}`, {type: db.QueryTypes.SELECT}).then(resp => {
            draft = _.map(resp, 'id_draft_founding_budgetary');
            cb();
          }).catch(e => cb(e));
      });

      async.parallel(tasks, err => {
        if (err) {
          logError(req.user, 'cfgFoundingBudgetaryCtrl - findAll', err, res)
        } else {
          for (let i = founding.length-1; i >= 0; i--) {
            for (let j = founding[i].data.length-1; j >= 0; j--) {
              delete founding[i].data[j].id_draft_founding_source;
              delete founding[i].data[j].id_draft_budgetary_sector;
              if (_.includes(draft, founding[i].data[j].id)) {
                founding[i].data[j].checked = true;
              }
            }
          }
          res.json({sectors, founding});
        }
      });
    },

    findAllForUnit: (req, res) => {
      db.query(`SELECT c.id, concat(s.code, f.code, ' - ', a.code, ' ', a.name) AS name
        FROM "CfgFoundingBudgetary" c
        LEFT JOIN "DraftFoundingBudgetaryActivity" d ON d.id = c.id_draft_founding_budgetary_activity
        LEFT JOIN "DraftActivity" a ON a.id = d.id_draft_activity
        LEFT JOIN "DraftFoundingBudgetary" fb ON fb.id = d.id_draft_founding_budgetary
        LEFT JOIN "DraftFoundingSource" f ON f.id = fb.id_draft_founding_source
        LEFT JOIN "DraftBudgetarySector" s ON s.id = fb.id_draft_budgetary_sector
        WHERE c.id_unit = ${req.user.id_unit}`, {type: db.QueryTypes.SELECT}).then(resp => {
          res.json(resp);
      }).catch(err => logError(req.user, 'cfgFoundingBudgetaryCtrl - findAll for unit', err, res));
    },

    findAcivityByFounding: (req, res) => {
      db.query(`SELECT concat(s.code, f.code, ' ', s.name, '/', f.name) AS name, TO_JSON(ARRAY_AGG(c.* ORDER BY c.code_row)) AS activities
        FROM "DraftFoundingBudgetary" b
        LEFT JOIN "DraftBudgetarySector" s ON s.id = b.id_draft_budgetary_sector
        LEFT JOIN "DraftFoundingSource" f ON f.id = b.id_draft_founding_source
        LEFT JOIN (
          SELECT c.id, d.id AS id_draf_founding_budgetary_activity, d.id_draft_founding_budgetary, a.code, a.name, a.last_child, a.code_row, 
          FROM "DraftFoundingBudgetaryActivity" d
          LEFT JOIN "DraftActivity" a ON a.id = d.id_draft_activity
          LEFT JOIN "CfgFoundingBudgetary" c ON c.id_draft_founding_budgetary_activity = d.id AND c.id_unit = ${req.user.id_unit}
          WHERE d.id_draft_founding_budgetary in (${req.body.idsFounding})
        ) c ON c.id_draft_founding_budgetary = b.id
        WHERE b.id in (${req.body.idsFounding}) GROUP BY s.id, f.id`, {type: db.QueryTypes.SELECT}).then(resp => {
          res.json(resp);
        }).catch(err => logError(req.user, 'cfgFoundingBudgetaryCtrl - findAll by founding', err, res));
    },

    createDestroy: (req, res) => {
      let tasks = [];
      if (req.body.toCreate && req.body.toCreate.length) {
        tasks.push(cb => {
          for (let i = req.body.toCreate.length-1; i >= 0; i--) {
            req.body.toCreate[i].id_unit = req.user.id_unit;
          }
          db.models.CfgFoundingBudgetary.bulkCreate(req.body.toCreate).then(() => cb()).catch(e => cb(e));
        });
      }

      if (req.body.toDelete && req.body.toDelete.length) {
        tasks.push(cb => {
          db.query(`DELETE FROM "CfgFoundingBudgetary" WHERE id in (${req.body.toDelete})`).then(() => cb()).catch(e => cb(e));
        });
      }

      async.parallel(tasks, err => {
        if (err) {
          logError(req.user, 'cfgFoundingBudgetaryCtrl - create FoundingBudgetary', e, res)
        } else {
          logAction(req.user.id, 'cfgFoundingBudgetaryCtrl - create FoundingBudgetary', 'Creare config');
          rhs(res);
        }
      });
    }
  }
}