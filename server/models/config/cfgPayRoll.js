module.exports = (sequelize, DataType) => {
	let model = sequelize.define('CfgPayRoll', {
    name: {
			type: DataType.STRING(150)
		},
		code: {
			type: DataType.STRING(30)
		},
		funding: {
			type: DataType.NUMERIC
		},
		funding_eu: {
			type: DataType.NUMERIC
		},
		ineligible: {
			type: DataType.NUMERIC
		}
	}, {
		timestamps: true
	});
  model.belongsTo(sequelize.models.CfgFoundingBudgetary, {foreignKey: 'id_cfg_founding_budgetary'});
  model.belongsTo(sequelize.models.CfgCompartment, {foreignKey: 'id_cfg_compartment'});
  model.belongsTo(sequelize.models.Unit, {foreignKey: 'id_unit', onDelete: 'cascade'});
	return model;
};