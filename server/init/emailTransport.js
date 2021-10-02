exports.createTransport = config => {
  if (config.env.trim() === 'production') {
    let nodemailer = require('nodemailer');

    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'psihologiuliagherasa@gmail.com',
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret.trim(),
        refreshToken: process.env.refreshToken.trim(),
        accessToken: process.env.accessToken.trim(),
        expires: 1484314697598
      }
    });
  }
};
