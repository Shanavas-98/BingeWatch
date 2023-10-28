const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, subject, text) => {
    try {
        const mailTransporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        const message = {
            from: 'Binge Watch',
            to: email,
            subject: subject,
            text: text,
        };
        await mailTransporter.sendMail(message);
        console.log('Email sent successfully');
        return true;
    } catch (error) {
        console.log('Email sent failed',error.message);
        return false;
    }
};

module.exports = sendEmail ;