const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

// transporter.verify((error) => {
//   if (error) {
//     console.log('Erro no transporter:', error);
//   } else {
//     console.log('Servidor de e-mail pronto');
//   }
// });

module.exports = transporter;