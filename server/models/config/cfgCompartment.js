module.exports = (sequelize, DataType) => {
	let model = sequelize.define('CfgCompartment', {
    name: {
			type: DataType.STRING(150)
		}
	}, {
		timestamps: true
	});
  model.belongsTo(sequelize.models.Unit, {foreignKey: 'id_unit', onDelete: 'cascade'});
	return model;
};