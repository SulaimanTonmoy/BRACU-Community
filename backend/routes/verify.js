const express = require('express');
const db = require('../connection.js');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post('/sendverification', (req, res) => {
    const data = req.body;
    var transporter = nodemailer.createTransport("SMTP", {
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
            user: "faisalhawlader04@outlook.com",
            pass: "password"
        },
        tls: {
            ciphers:'SSLv3'
        }
    });
    async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <faisalhawlader04@outlook.com>', // sender address
    to: "udoysaha103@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);
});
router.get('/verifycode')

module.exports = router;