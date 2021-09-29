exports.createTransport = config => {
  // if (config.env === 'production') {
    let nodemailer = require('nodemailer');

    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'psihologiuliagherasa@gmail.com',

        clientId: '215141620018-nsn1jct263ruatcd2cmdm3t7j7res1mq.apps.googleusercontent.com',
        clientSecret: 's8q91gscZGZpZUpCXme2Aih4',

        refreshToken: '1//04dozqZmrD-W_CgYIARAAGAQSNwF-L9IrTVPuparCwsCY2uuHc8weQatXttl6zu54gAUSW_6fm6ydoDxHjuV__Ae0NVn8nGeUyno',
        accessToken: 'ya29.a0ARrdaM8-OWo3mDAXx7EyLSfiXfcvHyBZ_53aqbpV0rooZQa8jM1UNfxHrHUiCBScuJj5G01Bk-8pUszZCszrRoqn-bAV5WRY2Pth8ezFV9udAyCxmBcwmX2z1fGtl10iZpozVxFG-mWLaFdtvx-epVHVPWrN',
        expires: 1484314697598
      }
    });
  // }
};
