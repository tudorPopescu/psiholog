module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftFoundingBudgetaryActivity', {
	}, {
		indexes: [
			{fields: ['id_draft_activity']},
			{fields: ['id_draft_founding_budgetary']}
		]
	});
  model.belongsTo(sequelize.models.DraftActivity, {foreignKey: 'id_draft_activity', onDelete: 'cascade'});
  model.belongsTo(sequelize.models.DraftFoundingBudgetary, {foreignKey: 'id_draft_founding_budgetary', onDelete: 'cascade'});
	return model;
};