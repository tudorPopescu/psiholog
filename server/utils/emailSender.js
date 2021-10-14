module.exports = db => {
  'use strict';
  const rhs    = require('../authorization/requestHandler').success;
  const moment = require('moment');

  return {
    sendMailErr: text => {
      const mailOptions = {
        from: 'Eroare Psiholog',
        to: ['contact@psihologiuliagherasa.ro'],
        subject: 'Eroare Psiholog Iulia Gherasa !',
        text: text
      };
      global.smtpTransport.sendMail(mailOptions, error => {
        if (error) {
          console.error('Email send err: ', error);
        }
      });
    },

    sendMailContact: (mail, res) => {
      const logError = require('../utils/utils')(db).logError;

      const mailOptions = {
        from: `${mail.last_name} ${mail.first_name}`,
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

      const mailOptions = {
        from: `${mail.last_name} ${mail.first_name}`,
        to: ['contact@psihologiuliagherasa.ro'],
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
