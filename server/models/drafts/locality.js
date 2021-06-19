module.exports = (sequelize, DataType) => {
	let model = sequelize.define('Locality', {
    name: {
			type: DataType.STRING(30)
		},
    code: {
      type: DataType.STRING(10)
    },
    type: {
      type: DataType.SMALLINT
    },
    type_locality: {
      type: DataType.STRING(15)
    },
    type_village: {
      type: DataType.STRING(15)
    }
	}, {
		timestamps: true
	});
  model.belongsTo(sequelize.models.County, {foreignKey: 'id_county', onDelete: 'cascade'});
	return model;
};