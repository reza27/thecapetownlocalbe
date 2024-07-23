import { createTransport, getTestMessageUrl } from "nodemailer";

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transport = createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

function sendEmail(text: string) {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>The Cape Town Local</p>
    </div>
  `;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: "info@thecapetownlocal.com",
    subject: "Your password reset token!",
    html: sendEmail(`Your Password Reset Token is here!
      <a href="${
        process.env.NODE_ENV === "production"
          ? process.env.PROD_URL + "/reset?token=${resetToken}"
          : "http://localhost:3000/reset?token=${resetToken}"
      }">Click Here to reset</a>
    `),
  });
  if (user?.includes("ethereal.email")) {
    console.log(`� Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }
}
