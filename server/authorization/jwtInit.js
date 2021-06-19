module.exports = app=> {
	'use strict';
	const updateLastLogin = require('../utils/utils')(app.locals.db).updateLastLogin;
	const authenticate = require('./authentication').authenticate;
	const jwt = require('jsonwebtoken');
	const router = require('express').Router();

	function render(res, user) {
		delete user.salt;
		delete user.password;

		user.token = jwt.sign(user, app.locals.config.sKey, {expiresIn: 86400});
		updateLastLogin(user.id);
		res.json(user);
	}

	router.post('/login', (req, res)=> {
		let d = new RegExp('"', 'g');
		let q = new RegExp('\'', 'g');
		let email = req.body.email.toLowerCase().replace(d, '').replace(q, '').replace(/\s/g, '');
		let email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

		if (email_regex.test(email)) {
			app.locals.db.query(`SELECT id, first_name, last_name, role, active, password, salt, id_unit, current_month FROM "User" WHERE email = '${req.body.email}'`, {type: app.locals.db.QueryTypes.SELECT}).then(user => {
				if (user.length) {
					if (user[0].active) {
						if (authenticate(req.body.password, user[0].salt, user[0].password)) {
							if (user[0].role !== 'admin' && user[0].role !== 'sa') {
								app.locals.db.query(`SELECT u.id, u.name, u.cui, u.phone, u.email, TO_JSON(a.*) AS address
									FROM "Unit" u
									LEFT JOIN (
										SELECT a.id_county, c.name AS county_name, a.id,a.id_village, v.name AS village_name, l.type_locality, l.type_village,
										a.id_locality, l.name AS locality_name, a.id_street, s.name AS street, a.number, id_unit, a.postal_code
										FROM "Address" a
										LEFT JOIN "County" c ON c.id = a.id_county
										LEFT JOIN "Locality" l ON l.id = a.id_locality
										LEFT JOIN "Village" v ON v.id = a.id_village
										LEFT JOIN "Street" s ON s.id = a.id_street
									) a ON a.id_unit = u.id
									WHERE u.id = ${user[0].id_unit}`, {type: app.locals.db.QueryTypes.SELECT}).then(resp => {
										user[0].unit = resp[0];
										render(res, user[0]);
									}).catch(e => {
										console.log('jwt: ', e);
										res.json({success: false, message: 'Eroare la preluarea datelor'});
									})
							} else {
								render(res, user[0]);
							}
						} else {
							res.json({success: false, message: 'Parolă greșită'});
						}
					} else {
						res.json({success: false, message: 'Contul este dezactivat'});
					}
				} else {
					res.json({success: false, message: 'Utilizator inexistent'});
				}
			}).catch(e => {
				console.log('Autentificare eșuată', e);
				res.json({success: false, message: 'Autentificare eșuată'});
			})
		} else {
			res.json({success: false, message: 'Adresa de email nu este validă'});
		}
	});

	return router;
};
