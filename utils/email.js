const transporter = require('../config/mail');

const sendConfirmationEmail = async (email, token) => {
    const confirmationLink = `http://localhost:300/confirm-email?token=${token}`;

    await transporter.sendMail({
        from: 'Biblioteca <no-reply@biblioteca.com>',
        to: email,
        subject: 'Confirme seu e-mail',
        html: `<p>Clive <a href="${confirmationLink}">aqui</a> para confirmar seu e-mail.</p>`
    });
};

