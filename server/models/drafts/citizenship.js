module.exports = (sequelize, DataType) => {
	let model = sequelize.define('Citizenship', {
    name: {
			type: DataType.STRING(50)
		}
	}, {
		timestamps: true
	});
	return model;
};