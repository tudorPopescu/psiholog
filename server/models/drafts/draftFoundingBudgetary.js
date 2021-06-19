module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftFoundingBudgetary', {
		
	}, {
    indexes: [
			{fields: ['id_draft_founding_source']},
			{fields: ['id_draft_budgetary_sector']}
		]
	});
  model.belongsTo(sequelize.models.DraftFoundingSource, {foreignKey: 'id_draft_founding_source', onDelete: 'cascade'});
  model.belongsTo(sequelize.models.DraftBudgetarySector, {foreignKey: 'id_draft_budgetary_sector', onDelete: 'cascade'});
	return model;
};