module.exports = (sequelize, DataType) => {
	let model = sequelize.define('Appointment', {
    name: {
			type: DataType.STRING(50)
		}
	}, {
		timestamps: true
	});
	return model;
};