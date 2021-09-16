module.exports = db => {
  'use strict';
  const {error: rh} = require('../authorization/requestHandler');
  // const emailSender = require('./emailSender')(db);
  const _ = require('lodash');
  const async = require('async');
  const fs = require('fs');
  const promise = require('node-promise').Promise;

  function logError(user, action, err, res) {
    console.log(action, err);
    let text = 'Data eroare: ' + (new Date()) + '\n\n';
    text += (user && user.unit) ? ('Unitate: ' + user.unit.name + ', CUI: ' + user.unit.cui + (user ? ', id: ' + user.id : null) + '\n\n') : 'server side problems';
    text += 'Acțiune: ' + action + '\n\nEroare: ' + err.toString();
    // emailSender.sendMailErr(text);
    db.models.LogError.create({id_user: user ? user.id : null, action: action, error: err ? err.toString() : '', detail: err ? JSON.stringify(err, null, 4) : ''}).then(() => {
      if (res) {
        res.status(400);
        res.end();
      }
    }).catch(() => {
      if (res) {
        res.status(400);
        res.end();
      }
    });
  }

  function logAction(idUser, action, details, isReport) {
    if (idUser) {
      db.models.LogAction.create({
        id_user: idUser,
        action: action,
        details: details,
        date: new Date(),
        is_report: (isReport !== null || isReport !== undefined ? isReport : null)
      }).catch(e => console.log('create logAction', e));
    }
  }

  function updateLastLogin(idUser) {
    if (idUser) {
      let tasks = [];

      tasks.push(cb => {
        db.query(`UPDATE "User" SET last_login = now() WHERE id = ${idUser}`).then(() => cb()).catch(e => cb(e));
      });

      tasks.push(cb => {
        db.query(`UPDATE "LogAction" SET date = now(), details = details || ';' || now()::text WHERE action = 'LogIn' AND id_user = ${idUser}`).then(resp => {
          if (resp[1].rowCount > 0) {
            cb();
          } else {
            db.query(`INSERT INTO "LogAction" (action, date, details, "createdAt", "updatedAt", id_user) VALUES ('LogIn', now(), now(), now(), now(), ${idUser})`).then(() => cb()).catch(e => cb(e));
          }
        }).catch(e => cb(e));
      });

      async.parallel(tasks, () => {
        return null;
      });
    }
  }

  function replaceDiacritics (text) {
    return text ? text.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '') : null
  }

  return {
    /* ---------------------------------------------- NO DB utils ---------------------------------------------- */
    logError: logError,
    logAction: logAction,
    updateLastLogin: updateLastLogin,
    replaceDiacritics: replaceDiacritics,

    renderPdf: (ob, res, req) => {
      const renderer = require('../init/pdf')(req.app);
      renderer.renderer(ob, (err, pdfPath) => {
        if (err !== true) {
          logError(req.user, 'error render PDF', err, res);
        } else if (pdfPath) {
          res.download(pdfPath, '', err => {
            if (err) {
              logError(req.user, 'error download static pdf', err, res);
            }
            fs.unlink(pdfPath, errUnlink => {
              if (errUnlink) {
                logError(req.user, 'error unlink static pdf file', errUnlink, res);
              }
            });
          });
        } else {
          rh(res, 'No pdf path found', err);
        }
      });
    },

    renderMultiplePdf: (ob, res, req) => {
      const renderer = require('../init/pdf')(req.app);
      const p = new promise();
      renderer.renderer(ob, (err, pdfPath, html) => {
        if (err !== true) {
          p.reject(err);
        } else if (pdfPath) {
          p.resolve({pdfPath, html});
        } else {
          p.reject(err);
        }
      });
      return p;
    },

    randomString: (len, charSet) => {
      charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var randomString = '';
      for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
      }
      return randomString;
    },

    getHandlebar: (unit, name) => {
      let d = new promise(), t = [], response = {}, condition = unit && unit.id ? 'OR id_unit = ' + unit.id : '';

      db.query(`SELECT content, orientation, disable_footer, footer_height
      FROM "Handlebar"
      WHERE name = '${name}' AND (id_unit is null ${condition})
      ORDER BY id_unit LIMIT 1`, {type: db.QueryTypes.SELECT}).then(resp => {
        if (resp.length) {
          response.template = resp[0];
          d.resolve(response)
        } else {
          cb(`template ${name} not found`);
        }
      }).catch(e => d.reject(e));
      return d;
    },
  };
};
