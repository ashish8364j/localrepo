
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const logger = require('../utils/consolelog.js');
const fromMail = process.env.FROM_MAIL;
const HOST = process.env.HOST;
const PASS = process.env.PASS;
const sendVerifyEmail = async (a) => {
  const { Otp, email } = a;
  const sixDigitOTP = Otp;
  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: fromMail,
        pass: PASS,
      }
    });

    const mailOptions = {
      from: fromMail,
      to: email,
      subject: `${sixDigitOTP}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error; 
  }

  return sixDigitOTP;
};

module.exports = sendVerifyEmail;
