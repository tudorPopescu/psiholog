module.exports = db => {
  'use strict';
  const rhs    = require('../authorization/requestHandler').success;
  const moment = require('moment');

  return {
    sendMailErr: text => {
      let mailOptions = {
        from: 'Psiholog Iulia Gherasa',
        to: ['psihologiuliagherasa@gmail.com'],
        subject: 'Eroare Psiholog Iulia Gherasa !',
        text: text
      };
      global.smtpTransport.sendMail(mailOptions, error => {
        if (error) {
          console.error('Email send err: ', error);
        } else {
          console.info('Email send YC!! ');
        }
      });
    },

    sendMailContact: (mail, res) => {
      const logError = require('../utils/utils')(db).logError;

      let mailOptions = {
        from: 'Psiholog Iulia Gerasa',
        to: ['contact@psihologiuliagherasa.ro'],
        subject: `Contact Psiholog Iulia Gherasa`,
        html: `
          <p style="margin-bottom: 5px;">Mail Contact trimis de către:<p/>
          <p style="margin-bottom: 5px;">Nume: <b>${mail.last_name}</b> Prenume: <b>${mail.first_name}</b></p>
          <p style="margin-bottom: 5px;">Telefon: <b>${mail.phone}</b></p>
          <p style="margin-bottom: 5px;">Email: <b>${mail.email}</b></p>
          <p style="margin-bottom: 5px;">Mesaj: <b>${mail.message}</b></p>
        `
      };

      global.smtpTransport.sendMail(mailOptions, e => {
        if (e) {
          logError('emailSender - sendMailContact', e, res);
        } else {
          rhs(res);
        }
      });
    },

    sendMailAppointment: (mail, res) => {
      const logError = require('../utils/utils')(db).logError;

      let mailOptions = {
        from: 'Psiholog Iulia Gerasa',
        to: ['psihologiuliagherasa@gmail.com'],
        subject: `Programare Cabinet Psiholog Iulia Gherasa`,
        html: `
          <p style="margin-bottom: 5px;">Programare facută de către:<p/>
          <p style="margin-bottom: 5px;">Nume: <b>${mail.last_name}</b> Prenume: <b>${mail.first_name}</b></p>
          <p style="margin-bottom: 5px;">Telefon: <b>${mail.phone}</b></p>
          <p style="margin-bottom: 5px;">Email: <b>${mail.email}</b></p>
          <p style="margin-bottom: 5px;">Data: <b>${moment(mail.date).format('DD.MM.yyyy')}</b></p>
        `
      };

      global.smtpTransport.sendMail(mailOptions, e => {
        if (e) {
          logError('emailSender - sendMailAppointment', e, res);
        } else {
          rhs(res);
        }
      });
    },
  };
};
