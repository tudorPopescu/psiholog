module.exports = (sequelize, DataType) => {
	let model = sequelize.define('Street', {
    name: {
			type: DataType.STRING(50)
		},
    checked: {
      type: DataType.BOOLEAN
    }
	}, {
		timestamps: true
	});
  model.belongsTo(sequelize.models.Village, {foreignKey: 'id_village', onDelete: 'set null'});
  model.belongsTo(sequelize.models.StreetType, {foreignKey: 'id_street_type', onDelete: 'set null'});
	return model;
};