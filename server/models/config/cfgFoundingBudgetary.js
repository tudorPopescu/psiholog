module.exports = (sequelize, DataType) => {
	let model = sequelize.define('CfgFoundingBudgetary', {
	}, {
		timestamps: true
	});
  model.belongsTo(sequelize.models.DraftFoundingBudgetaryActivity, {foreignKey: 'id_draft_founding_budgetary_activity', onDelete: 'set null'});
  model.belongsTo(sequelize.models.Unit, {foreignKey: 'id_unit', onDelete: 'cascade'});
	return model;
};