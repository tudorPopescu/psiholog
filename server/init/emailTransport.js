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
        clientSecret: 's7QWL8GV56Hc-OasDBFH0KyC',

        accessToken: 'ya29.a0ARrdaM-ppFCmkYtqeGfOYvmSNcit1EtpOz-F_OUZyNe5XvHHM0xVEr77XTgRICRrqLLFDOWXFNaqyfl6FFRSVo0zUhzFIhJguwz7rLQhFGwP6vdpGPmKOmoyLfkYtb9xQH8dIeG-vOcgpFClNMljBwq9hBJP',
        refreshToken: '1//04Z2-6DhFIEMWCgYIARAAGAQSNwF-L9Irb5_yAjr00-vd1zD_strdLemZ2O35B87QrhPZi5Un5EOTOs1au9GhwJWxpaAFgqGbQvU',
        expires: 1484314697598
      }
    });
  // }
};
