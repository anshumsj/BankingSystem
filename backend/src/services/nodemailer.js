require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Banking System" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const RegistrationEmail = (username, email) => {
  const subject = 'Welcome to Our Banking System!';
  const text = `Dear ${username}, welcome to our banking system! We're excited to have you on board.`;
  const html = `<p>Dear <strong>${username}</strong>, welcome to our banking system! We're excited to have you on board.</p>`;
  sendEmail(email, subject, text, html);
};

const TransactionEmail = (username , email , amount , toAccount) => {
  const subject = 'Transaction Alert';
  const text = `Dear ${username}, a transaction of $${amount} has been made to account ${toAccount}.`;
  const html = `<p>Dear <strong>${username}</strong>, a transaction of <strong>$${amount}</strong> has been made to account <strong>${toAccount}</strong>.</p>`;
  sendEmail(email, subject, text, html);
}

const TransactionFailedEmail = (username , email , amount , toAccount) => {
  const subject = 'Transaction Failed Alert';
  const text = `Dear ${username}, a transaction of $${amount} to account ${toAccount} has failed. Please check your account balance and try again.`;
  const html = `<p>Dear <strong>${username}</strong>, a transaction of <strong>$${amount}</strong> to account <strong>${toAccount}</strong> has failed. Please check your account balance and try again.</p>`;
  sendEmail(email, subject, text, html);
}

module.exports = { sendEmail, RegistrationEmail, TransactionEmail, TransactionFailedEmail};