import nodemailer from "nodemailer";
import path from "path";
import { config } from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

config();

// const logoPath = path.join(__dirname, "./Assets/logo/bird_logo.svg");
function emailHtml(info){ 
  info.date = new Date(info.date).toLocaleDateString('en-GB').replace(/\//g, '-');
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Renewal Reminder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }

        .email-header {
            background-color: #0056b3;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-content {
            padding: 20px;
            text-align: center;
        }

        .email-content h2 {
            font-size: 20px;
            margin-bottom: 15px;
        }

        .email-content p {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .btn:hover {
            background-color: #218838;
        }

        .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #777;
        }

        .footer a {
            color: #0056b3;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <div class="email-header">
            <h1>Document Renewal Reminder</h1>
        </div>

        <div class="email-content">
            <h2>Dear ${info.user_name},</h2>
            <p>This is a friendly reminder that your document, <strong>${info.state ? info.state : info.country}${info.type}</strong>, is set to expire soon.</p>
            <p>To avoid any disruptions, we recommend renewing your document before the expiration date of <strong>${info.date}</strong>.</p>
            <p>Click the button below to begin the renewal process:</p>
            <a href="[Renewal Link]" class="btn">Renew Your Document</a>
        </div>

        <div class="footer">
            <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact support</a>.</p>
            <p>Thank you for using our service!</p>
        </div>
    </div>

</body>
</html>
`}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.APP_PWD
  }
})

const sendMail = (info) => {
  transporter.sendMail({
    to: info.user_email,
    subject: `REMINDER! ${info.type} SET TO EXPIRE ON ${info.date}`,
    html: emailHtml(info)
  }).then(() => {
    console.log('Email sent');
  }).catch(err =>
    console.log("Error", err))
}

const info = {
  id: 15,
  user_email: 'bunim175@gmail.com',
  user: 1,
  date: '2025-02-23T23:00:00.000Z',
  user_name: 'simcha justman',
  type: 'I.D. card',
  country: 'Belgium',
  state: null,
  six_months: 0,
  reminder_period: 'Week in advance',
  deleted_at: null
}

console.log(emailHtml(info))

//sendMail(info.user_email, info)
// <<<<<~~~~~~>>>>> Test function <<<<<~~~~~~>>>>> //


export default sendMail;