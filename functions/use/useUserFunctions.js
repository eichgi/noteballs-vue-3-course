const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

exports.sendEmailToNewUser = async (user) => {
  /*let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY',
    }
  });

  transporter.sendMail({
    from: 'hello@noteballs.com',
    to: process.env.TEMPORARY_EMAIL_ADDRESS,
    subject: 'Welcome to Noteballs',
    text: 'Hola y bienvenido a nuestra plataforma',
    html: '<b>Hola y bienvenido a nuestra plataforma <i>Noteballs</i>!</b>'
  }, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });*/

  const mailgunAuth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    }
  }

  const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));

  const mailOptions = {
    from: "hello@noteballs.com",
    to: process.env.TEMPORARY_EMAIL_ADDRESS,
    subject: "Welcome to Noteballs!",
    html: '<b>Hola y bienvenido a nuestra plataforma <i>Noteballs</i>!</b>'
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      functions.logger.info(error);
    } else {
      functions.logger.info("Successfully sent email!");
    }
  });
}