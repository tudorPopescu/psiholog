module.exports = (sequelize, DataType) => {
	let model = sequelize.define('CfgPayRollJunction', {
	}, {
		timestamps: true
	});
  model.belongsTo(sequelize.models.CfgPayRoll, {foreignKey: 'id_cfg_payroll', onDelete: 'cascade'});
  model.belongsTo(sequelize.models.CfgPayRollCentralizing, {foreignKey: 'id_cfg_payroll_centralizing', onDelete: 'cascade'});
	return model;
};