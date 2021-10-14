exports.createTransport = config => {
  if (config.env === 'production') {
    let nodemailer = require('nodemailer');
    return nodemailer.createTransport({
      host: 'smtp.psihologiuliagherasa.ro',
      port: 465,
      secure: true,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: process.env.CLIENT_ID.trim(),
        pass: process.env.CLIENT_SECRET.trim()
      }
    });
  }
};
