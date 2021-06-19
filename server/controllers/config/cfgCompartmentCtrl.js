module.exports = db => {
  const {success: rhs}         = require('../../authorization/requestHandler');
  const {logAction: logAction} = require('../../utils/utils')(db);
  const {logError: logError}   = require('../../utils/utils')(db);
  const _                      = require('lodash');
  const async                  = require('async');

  return {
    findAll: (req, res) => {
      db.query(`SELECT id, name FROM "CfgCompartment" WHERE id_unit = ${req.user.id_unit}`, {type: db.QueryTypes.SELECT}).then(resp => res.send(resp)).catch(e => logError(req.user, 'cfgCompartmentCtrl - findAll', e, res));
    },

    create: (req, res) => {
      let tasks = [];

      if (req.body.toCreate && req.body.toCreate.length) {
        tasks.push(cb => {
          for (let i = req.body.toCreate.length-1; i >= 0; i--) {
            req.body.toCreate[i].id_unit = req.user.id_unit;
          }
          db.models.CfgCompartment.bulkCreate(req.body.toCreate).then(() => cb()).catch(e => cb(e));
        });
      }

      if (req.body.toUpdate && req.body.toUpdate.length) {
        _.each(req.body.toUpdate, up => {
          tasks.push(cb => {
            db.models.CfgCompartment.update(up, {where: {id: up.id}}).then(() => cb()).catch(e => cb(e));
          });
        });
      }

      if (req.body.toDelete && req.body.toDelete.length) {
        tasks.push(cb => {
          db.query(`DELETE FROM "CfgCompartment" WHERE id in (${req.body.toDelete})`).then(() => cb()).catch(e => cb(e));
        });
      }

      async.parallel(tasks, err => {
        if (err) {
          logError(req.user, 'cfgCompartmentCtrl - create, update, delete', e, res);
        } else {
          logAction(req.user.id, 'cfgCompartmentCtrl - create', 'Creare actualizare stergere compatiment');
          rhs(res);
        }
      });
    }
  }
}