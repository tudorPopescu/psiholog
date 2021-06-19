module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftOutgoing', {
    name: {
			type: DataType.TEXT
		},
    title: {
			type: DataType.STRING(50)
		},
    article: {
			type: DataType.STRING(50)
		},
    paragraph: {
			type: DataType.STRING(50)
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