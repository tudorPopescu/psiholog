module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftBank', {
		name: {
			type: DataType.STRING(200)
		},
    emblem: {
      type: DataType.BLOB
    }
	});
	return model;
};