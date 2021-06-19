module.exports = (sequelize, DataType) => {
	let model = sequelize.define('DraftSeniorityBonus', {
		year_start: {
			type: DataType.INTEGER
		},
    year_end: {
			type: DataType.INTEGER
		},
    percent: {
      type: DataType.NUMERIC
    }
	});
	return model;
};