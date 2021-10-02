exports.createTransport = config => {
  if (config.env === 'production') {
    let nodemailer = require('nodemailer');

    console.log('process', process.env.clientId);

    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'psihologiuliagherasa@gmail.com',
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: process.env.accessToken,
        expires: 1484314697598
      }
    });
  }
};
