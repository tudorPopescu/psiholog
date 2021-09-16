module.exports = db => {
  const emailSender = require('../utils/emailSender')(db);

  return {
    sendEmail: (req, res) => {
      emailSender.sendMailContact(req.body, res)
    }
  }
}