const nodemailer = require("nodemailer");

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

console.log("username >", user);
console.log("password > ", pass);

export const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
