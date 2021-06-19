module.exports = (sequelize, DataType) => {
	let model = sequelize.define('Country', {
    name: {
			type: DataType.STRING(50)
		},
    code: {
      type: DataType.STRING(2)
    }
	}, {
		timestamps: true
	});
	return model;
};