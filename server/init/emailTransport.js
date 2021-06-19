exports.createTransport = config => {
	if (config.env === 'production') {
		let nodemailer = require('nodemailer');
		//console.log('Init email transport');
		return nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				type: 'OAuth2',
				user: 'development.yourconsulting@gmail.com',

				clientId: '173143903361-s0cga8h908j9sg29m3oiaprjgtfi2b7p.apps.googleusercontent.com',
				clientSecret: 'NDf7tinVH_vK4hLbxA_-Fw80',

				accessToken: 'ya29.a0AfH6SMCUyVBwqhkhuXOob2yhCSMx0lOCN1ewtqnnEVQYVNd4yf7KUvjBnmDcH91qL6YVa2YRS3Ml5ZLjMFMxnQvHIQO61ZtuCIsSmoRSYTjytg07ve5W4tqMCFSDPz9bWIawXkNAgjSCX7A-VXyYhw-inSQjcjPQCvw',
				refreshToken: '1//04CqPYl_cVTWoCgYIARAAGAQSNwF-L9IrQefJQ5XQUqsgVhNRE3k2h5KvclW-sULn2U3n1VzhQmWcYna6QAMBKJgGd9nzux3zkww',
				expires: 1484314697598
			}
		});
	}
};
