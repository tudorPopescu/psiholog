module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftRetain', {
    name: {
			type: DataType.STRING(150)
		},
		retire: {
			type: DataType.STRING(30)
		}
	}, {
		timestamps: true
	});
	return model;
};