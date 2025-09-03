const nodemailer = require("nodemailer");
// , subject, accessEmail, userName
async function sendEmail(to) {


//   const htmlMessage = `

// <!DOCTYPE html>

// <html>

// <head>

//  <meta charset="UTF-8" />

//  <style>

//   body {

//    font-family: Arial, sans-serif;

//    background: #f9f9f9;

//    padding: 20px;

//    text-align: center;

//   }

//   .header {

//    background: linear-gradient(45deg, #038ec3, #db1010);

//    color: white;

//    padding: 20px;

//    border-radius: 10px;

//    font-size: 24px;

//    font-weight: bold;

//   }

//   .content {

//    background: linear-gradient(212deg, #350000, #00131c);

//    margin-top: 20px;

//    padding: 20px;

//    border-radius: 10px;

//    box-shadow: 0 0 10px rgba(0,0,0,0.1);

//    font-size: 16px;

//    line-height: 1.5;

//    color: white;

//   }

//   .btn {

//    display: inline-block;

//    margin-top: 20px;

//    padding: 12px 20px;

//    background: linear-gradient(45deg, #038ec3, #db1010);

//    color: white;

//    text-decoration: none;

//    border-radius: 8px;

//    font-weight: bold;

//   }
//    .divider {
//     border: none;
//    height: 1px;
//     margin: 20px 0;
//     background: white;
//   }

//  </style>

// </head>

// <body>

//  <div class="header">

//   Auth App

//  </div>

//  <div class="content">
  
//   <h3>Hello <span style="color:white">${userName}</span></h3>
//     <hr class="divider" />
//   <p>Thank you for registering at <strong>Auth App</strong>.</p>

//   <p>Please confirm your email by clicking the button below:</p>

//   <a href="${accessEmail}" class="btn" style="color:white">Verify Email</a>

//   <p style="margin-top:20px; font-size:12px; ">

//    Or copy and paste this link into your browser: <br />

//   </p>

//  </div>

// </body>

// </html>

// `;

  // إعدادات SMTP مع Gmail
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,              // SSL
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password من Google
    },
    connectionTimeout: 20000, // 20 ثانية
    socketTimeout: 20000,     // 20 ثانية
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
       subject: "Test Email",
    text: "If you received this, Gmail works!"
    });
    console.log("Email sent successfully ✅");
  } catch (error) {
    console.error("Error sending email ❌:", error.message);
  }
}

module.exports = sendEmail;
