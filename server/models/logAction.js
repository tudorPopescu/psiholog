module.exports = (sequelize, DataType) => {
	let model = sequelize.define('LogAction', {
		action: {
			type: DataType.STRING
		},
    date: {
			type: DataType.DATEONLY
		},
		details: {
			type: DataType.TEXT
		},
    is_report: {
      type: DataType.BOOLEAN
    }
	}, {
		timestamps: true,
		indexes: [
			// {fields: ['id_user']},
			// {fields: ['id_employee']}
		]
	});
	// model.belongsTo(sequelize.models.User, {foreignKey: 'id_user', onDelete: 'cascade'});
	// model.belongsTo(sequelize.models.Employee, {foreignKey: 'id_employee', onDelete: 'set null'});
	return model;
};
