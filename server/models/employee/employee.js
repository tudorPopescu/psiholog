module.exports = (sequelize, DataType) => {
	let model = sequelize.define('Employee', {
		first_name: {
			type: DataType.STRING(200)
		},
		last_name: {
			type: DataType.STRING(200)
		},
		cnp: {
			type: DataType.STRING(13)
		},
		nr_marca: {
			type: DataType.STRING(20)
		},
		employment_date: {
			type: DataType.DATEONLY
		},
		ic_type: {
			type: DataType.STRING(4)
		},
		ic_series: {
			type: DataType.STRING(2)
		},
		ic_number: {
			type: DataType.STRING(6)
		},
		ic_issued: {
			type: DataType.STRING(150)
		},
		ic_start_date: {
			type: DataType.DATEONLY
		},
		ic_stop_date: {
			type: DataType.DATEONLY
		},
		phone: {
			type: DataType.STRING(12)
		},
		email: {
			type: DataType.STRING(150)
		}
	}, {
		timestamps: true,
		indexes: [
			{fields: ['id_unit']},
			{fields: ['id_citizenship']}
		]
	});
	model.belongsTo(sequelize.models.User, {foreignKey: 'id_unit', onDelete: 'cascade'});
	model.belongsTo(sequelize.models.Citizenship, {foreignKey: 'id_citizenship', onDelete: 'set null'});
	return model;
};
