module.exports = (sequelize, DataType) => {
	let model = sequelize.define('CfgBank', {
    name: {
			type: DataType.STRING(150)
		},
    iban: {
      type: DataType.STRING(24)
    }
	}, {
		timestamps: true
	});
  model.belongsTo(sequelize.models.DraftBank, {foreignKey: 'id_draft_bank', onDelete: 'set null'});
  model.belongsTo(sequelize.models.Unit, {foreignKey: 'id_unit', onDelete: 'cascade'});
	return model;
};