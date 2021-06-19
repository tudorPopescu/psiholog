module.exports = (sequelize, DataType) => {
	let model = sequelize.define('LogError', {
		action: {
			type: DataType.STRING
		},
		error: {
			type: DataType.STRING
		},
		detail: {
			type: DataType.TEXT
		}
	}, {
		timestamps: true,
		indexes: [
			{fields: ['id_user']},
			{fields: ['id_employee']}
		]
	});
	model.belongsTo(sequelize.models.User, {foreignKey: 'id_user', onDelete: 'cascade'});
	model.belongsTo(sequelize.models.Employee, {foreignKey: 'id_employee', onDelete: 'set null'});
	return model;
};
