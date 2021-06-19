module.exports = function getModels(sequelize, Sequelize) {
	'use strict';

	const fs = require('fs');
	const path = require('path');
	const _ = require('lodash');

	var fileTree = [];

	function getFilesRecursive(folder) {
		var fileContents = fs.readdirSync(folder), stats;
		fileContents.forEach(function (fileName) {
			stats = fs.lstatSync(folder + '/' + fileName);
			if (stats.isDirectory()) {
				getFilesRecursive(folder + '/' + fileName);
			} else {
				if (((fileName.indexOf('.') !== 0) && (fileName !== 'index.js') && (fileName.slice(-3) === '.js'))) {
					fileTree.push(folder + '/' + fileName);
				}
			}
		});
		return fileTree;
	}

	getFilesRecursive(__dirname);

	let arr = [
		{path: __dirname + '/user.js', sync: false},
		{path: __dirname + '/appointment.js', sync: false},
		{path: __dirname + '/service.js', sync: false},
		{path: __dirname + '/logError.js', sync: false},
		{path: __dirname + '/logAction.js', sync: false},
	];

	let syncTables = [];

	_.each(arr, file => {
		if (file.sync && process.env.RUN_CRON === 'true') {
			let model = require(path.join(file.path))(sequelize, Sequelize);
			syncTables.push(model);
		} else {
			require(path.join(file.path))(sequelize, Sequelize);
		}
	});

	for (let i = 0; i < fileTree.length; i++) {
		let tmp = _.find(arr, {path: fileTree[i]});
		if (!tmp) {
			let modelName = fileTree[i].substring(fileTree[i].lastIndexOf('/') + 1, fileTree[i].indexOf('.js'));
			modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
			console.log('Nu este introdusă ruta pentru modelul: ' + modelName);
			let model = require(fileTree[i])(sequelize, Sequelize);
			syncTables.push(model);
		}
	}

	if(syncTables.length && process.env.RUN_CRON === 'true'){
		_.each(syncTables, file => {
			console.log(file);
			file.sync({alter: true, logging: false});
		});
	}

	return sequelize;
};