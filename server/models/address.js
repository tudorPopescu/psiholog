module.exports = (sequelize, DataType) => {
	let model = sequelize.define('Address', {
    number: {
			type: DataType.STRING(20)
		},
    block: {
      type: DataType.STRING(10)
    },
    staircase: {
      type: DataType.STRING(10)
    },
    floor: {
      type: DataType.STRING(10)
    },
    apartment: {
      type: DataType.STRING(10)
    },
    postal_code: {
      type: DataType.STRING(6)
    }
	}, {
		timestamps: true
	});
  model.belongsTo(sequelize.models.County, {foreignKey: 'id_county', onDelete: 'set null'});
  model.belongsTo(sequelize.models.Locality, {foreignKey: 'id_locality', onDelete: 'set null'});
  model.belongsTo(sequelize.models.Village, {foreignKey: 'id_village', onDelete: 'set null'});
  model.belongsTo(sequelize.models.Street, {foreignKey: 'id_street', onDelete: 'set null'});
  model.belongsTo(sequelize.models.Unit, {foreignKey: 'id_unit', onDelete: 'cascade'});
	return model;
};