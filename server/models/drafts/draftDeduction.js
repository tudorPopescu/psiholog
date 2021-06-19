module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftDeduction', {
		amount_start: {
			type: DataType.NUMERIC
		},
    amount_end: {
			type: DataType.NUMERIC
		},
    start: {
			type: DataType.DATEONLY
		},
    stop: {
			type: DataType.DATEONLY
		},
    amount: {
      type: DataType.NUMERIC
    },
    no_pers: {
      type: DataType.INTEGER
    }
	});
	return model;
};