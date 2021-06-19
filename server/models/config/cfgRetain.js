module.exports = (sequelize, DataType) => {
	let model = sequelize.define('CfgRetain', {
    name: {
			type: DataType.STRING(150)
		},
    month_rate: {
			type: DataType.NUMERIC
		},
    total_amount: {
			type: DataType.NUMERIC
		},
    start: {
			type: DataType.DATEONLY
		},
    stop: {
			type: DataType.DATEONLY
		},
    percent: {
			type: DataType.NUMERIC
		},
    deducted_tax: {
			type: DataType.BOOLEAN
		},
    iban: {
			type: DataType.STRING(24)
		}
	}, {
		timestamps: true
	});
  model.belongsTo(sequelize.models.Unit, {foreignKey: 'id_unit', onDelete: 'cascade'});
  model.belongsTo(sequelize.models.DraftRetain, {foreignKey: 'id_draft_retain_applied'});
  model.belongsTo(sequelize.models.DraftRetain, {foreignKey: 'id_draft_retain_retire'});
	return model;
};