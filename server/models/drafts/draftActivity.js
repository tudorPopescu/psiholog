module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftActivity', {
		code: {
			type: DataType.STRING(30)
		},
		name: {
			type: DataType.TEXT
		},
    code_row: {
      type: DataType.SMALLINT
    },
    last_child: {
      type: DataType.BOOLEAN
    }
	});
  model.belongsTo(model, {foreignKey: 'id_superior', onDelete: 'cascade'});
	return model;
};