const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports = async ({ email, nameCompany, uuid }) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Admin" ${process.env.SMTP_EMAIL}`, // sender address
    to: `${email}`, // list of receivers
    subject: `Hello ${nameCompany} | Welcome in JobDashboard`, // Subject line
    html: `<p>Hello ${nameCompany}. Your account has been registered. To verify your email: <a href='${process.env.HOST + '/signin?verify=' + uuid }'>click here</a></p>`
  });
}