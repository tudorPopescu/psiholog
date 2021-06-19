module.exports = (sequelize, DataType) => {
	let model = sequelize.define('Service', {
    name: {
			type: DataType.STRING(40)
		},
		postal_code: {
			type: DataType.STRING(6)
		},
    code: {
      type: DataType.STRING(10)
    }
	}, {
		timestamps: true
	});
  // model.belongsTo(sequelize.models.Locality, {foreignKey: 'id_locality', onDelete: 'cascade'});
	return model;
};