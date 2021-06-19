module.exports = db => {
  const {success: rhs} = require('../../authorization/requestHandler');
  const logError       = require('../../utils/utils')(db).logError;
  const logAction      = require('../../utils/utils')(db).logAction;
  const async          = require('async');

  return {
    create: (req, res) => {
      logAction(req.user.id, 'adminUserCtrl - create User', `tip utilizator: ${req.body.role}`);

      if (req.body.role === 'sa' || req.body.role === 'admin') {
        db.models.User.create(req.body).then(() => rhs(res)).catch(e => logError(req.user, 'adminUserCtrl - create (sa)', e, res));
      } else if (req.body.role === 'clientAdmin') {
        db.models.Unit.create(req.body.unit).then(resp => {
          let t = [];

          t.push(cb => {
            req.body.id_unit = resp.id;
            db.models.User.create(req.body).then(() => cb()).catch(e => cb(e));
          });

          t.push(cb => {
            req.body.unit.address.id_unit = resp.id;
            req.body.unit.address.id_country = 1;

            if (!req.body.unit.address.id_street && req.body.unit.address.street_name) {
              let street = {name: req.body.unit.address.street_name, id_village: req.body.unit.address.id_village, street_type: req.body.unit.address.street_type};

              db.models.Street.create(street).then(s => {
                req.body.unit.address.id_street = s.id;

                db.models.Address.create(req.body.unit.address).then(() => cb()).catch(e => cb(e));
              }).catch(e => cb(e));
            } else {
              db.models.Address.create(req.body.unit.address).then(() => cb()).catch(e => cb(e));
            }
          });

          async.parallel(e => {
            if (e) {
              logError(req.user, 'adminUserCtrl - create', e, res);
            } else {
              rhs(res);
            }
          });
        }).catch(e => logError(req.user, 'adminUserCtrl - create (clientAdmin)', e, res));
      } else {
        logError(req.user, 'adminUserCtrl - create', 'Create without role', res);
      }
    },

    update: (req, res) => {
      logAction(req.user.id, 'adminUserCtrl - update User', `tip utilizator: ${req.body.role}, id: ${req.body.id}`);

      let t = [];
      t.push(cb => {
        db.models.User.update(req.body, {where: {id: req.body.id}}).then(() => cb()).catch(e => cb(e));
      });

      if (req.body.role === 'clientAdmin') {
        t.push(cb => {
          db.models.Unit.update(req.body.unit, {where: {id: req.body.unit.id}}).then(() => cb()).catch(e => cb(e));
        });

        t.push(cb => {
          if (!req.body.unit.address.id_street && req.body.unit.address.street_name) {
            let street = {name: req.body.unit.address.street_name, id_village: req.body.unit.address.id_village, street_type: req.body.unit.address.street_type};

            db.models.Street.create(street).then(s => {
              req.body.unit.address.id_street = s.id;

              db.models.Address.update(req.body.unit.address).then(() => cb()).catch(e => cb(e));
            }).catch(e => cb(e));
          } else {
            db.models.Address.update(req.body.unit.address, {where: {id: req.body.unit.address.id}}).then(() => cb()).catch(e => cb(e));
          }
        });
      }

      async.parallel(t, e => {
        if (e) {
          logError(req.user, 'adminUserCtrl - update', e, res);
        } else {
          rhs(res);
        }
      })
    },

    findAll: (req, res) => {
      db.query(`SELECT CONCAT(u.last_name, ' ', u.first_name) AS name, u.email, u.role, u.last_login, u.active
      , n.name AS unit_name, n.cui, c.name AS county_name, l.name AS locality_name, v.name AS village_name
      FROM "User" u
      LEFT JOIN "Unit" n ON n.id = u.id_unit
      LEFT JOIN "Address" a ON a.id_unit = n.id
      LEFT JOIN "County" c ON c.id = a.id_county
      LEFT JOIN "Locality" l ON l.id = a.id_locality
      LEFT JOIN "Village" v ON v.id = a.id_village
      WHERE u.role = 'clientAdmin'`, {type: db.QueryTypes.SELECT}).then(resp => {
        res.send(resp);
      }).catch(e => logError(req.user, 'adminUserCtrl - findAll', e, res));
    },

    find: (req, res) => {
      let t = [], obj = {unit: {}, address: {}};

      t.push(cb => {
        db.query(`SELECT id, first_name, last_name, email, phone, role, active, policy, current_month
        FROM "User"
        WHERE id = ${req.params.id}
        ORDER BY id`, {type: db.QueryTypes.SELECT}).then(resp => {
          obj.user = resp[0];
          cb();
        }).catch(e => cb(e));
      });

      t.push(cb => {
        db.query(`SELECT n.id, n.name, n.cui
        FROM "User" u
        RIGHT JOIN "Unit" n ON n.id = u.id_unit
        WHERE u.id = ${req.params.id}
        ORDER BY u.id`, {type: db.QueryTypes.SELECT}).then(resp => {
          if (resp.length) {
            obj.unit = resp[0];
          }
          cb();
        }).catch(e => cb(e));
      });

      t.push(cb => {
        db.query(`SELECT a.id, a.id_county, a.id_locality, a.id_village, a.number, a.postal_code, a.id_street, s.name AS street_name
        FROM "User" u
        LEFT JOIN "Unit" n ON n.id = u.id_unit
        RIGHT JOIN "Address" a ON a.id_unit = n.id
        LEFT JOIN "Street" s ON s.id = a.id_street
        WHERE u.id = ${req.params.id}
        ORDER BY u.id`, {type: db.QueryTypes.SELECT}).then(resp => {
          if (resp.length) {
            obj.address = resp[0];
          }
          cb();
        }).catch(e => cb(e));
      });

      async.parallel(t, e => {
        if (e) {
          logError(req.user, 'adminUserCtrl - find', e, res)
        } else {
          let user = obj.user;
          user.unit = obj.unit;
          user.address = obj.address;
          res.json(user);
        }
      });
    },

    destroy: (req, res) => {
      logAction(req.user.id, 'adminUserCtrl - delete User', `Stergere utilizator din admin`);
      db.query(`DELETE FROM "Unit" WHERE id = ${req.params.id}`).then(() => rhs(res)).catch(e => logError(req.user, 'adminUserCtrl - destroy', e, res))
    }
  }
};
