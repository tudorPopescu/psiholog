module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftBudgetarySector', {
		code: {
			type: DataType.STRING(4)
		},
		name: {
			type: DataType.STRING(150)
		},
		old_code: {
			type: DataType.STRING(2)
		},
		iban_code: {
			type: DataType.STRING(2)
		}
	});
	return model;
};