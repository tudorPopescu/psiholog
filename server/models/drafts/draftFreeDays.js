module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftFreeDays', {
		date: {
			type: DataType.DATEONLY
		},
    name: {
			type: DataType.STRING(100)
		},
    year: {
      type: DataType.INTEGER
    }
	});
	return model;
};