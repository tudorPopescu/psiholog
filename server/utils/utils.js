module.exports = db => {
  'use strict';
  const emailSender = require('./emailSender')(db);
  const async = require('async');

  function logError(action, err, res) {
    console.error(action, err);
    let text = 'Data eroare: ' + (new Date()) + '\n\n';
    text += 'Acțiune: ' + action + '\n\nEroare: ' + err.toString();
    emailSender.sendMailErr(text);
    db.models.LogError.create({ action: action, error: err ? err.toString() : '', detail: err ? JSON.stringify(err, null, 4) : '' }).then(() => {
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

  function updateLastLogin(idUser) {
    if (idUser) {
      let tasks = [];

      tasks.push(cb => {
        db.query(`UPDATE "User" SET last_login = now() WHERE id = ${idUser}`).then(() => cb()).catch(e => cb(e));
      });

      async.parallel(tasks, () => {
        return null;
      });
    }
  }

  return {
    logError: logError,
    updateLastLogin: updateLastLogin
  };
};
