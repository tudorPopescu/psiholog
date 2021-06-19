module.exports = (sequelize, DataType) => {
	let model = sequelize.define('StreetType', {
    name: {
			type: DataType.STRING(100)
		},
    code: {
      type: DataType.STRING(20)
    }
	}, {
		timestamps: true
	});
	return model;
};