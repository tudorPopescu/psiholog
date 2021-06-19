module.exports = db => {
  'use strict';
  const {logError: logError}   = require('../../utils/utils')(db);

  return {
    findAll: (req, res) => {
      db.query(`SELECT d.id, CONCAT(b.code, f.code, '-', b.name, '/', f.name) AS name
      FROM "DraftFoundingBudgetary" d
      LEFT JOIN "DraftBudgetarySector" b ON b.id = d.id_draft_budgetary_sector
      LEFT JOIN "DraftFoundingSource" f ON f.id = d.id_draft_founding_source`, {type: db.QueryTypes.SELECT}).then(resp => res.json(resp)).catch(e => logError(req.user, 'draftFoundingBudgetaryCtrl - findAll', e, res));
    }
  }
}