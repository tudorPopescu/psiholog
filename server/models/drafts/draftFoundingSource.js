module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftFoundingSource', {
		code: {
			type: DataType.STRING(4)
		},
		name: {
			type: DataType.STRING(150)
		}
	});
	return model;
};