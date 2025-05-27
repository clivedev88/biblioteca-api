const transporter = require('../config/mail');

const sendConfirmationEmail = async (email, token) => {
  try {
    const confirmationLink = `http://localhost:3000/api/auth/confirm-email?token=${token}`;
    
    const info = await transporter.sendMail({
      from: '"Biblioteca 👻" <seuemail@gmail.com>',
      to: email,
      subject: 'Confirme seu e-mail',
      html: `
        <h2>Confirmação de Cadastro</h2>
        <p>Clique no link abaixo para confirmar seu e-mail:</p>
        <a href="${confirmationLink}">Confirmar E-mail</a>
      `,
    });

    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
};

module.exports = sendConfirmationEmail;