// @ts-nocheck
import { createTransport, getTestMessageUrl } from "nodemailer";

import { frontendURL } from "./urls";

var prodTransport = createTransport({
  host: process.env.PROD_MAIL_HOST,
  port: process.env.PROD_MAIL_PORT,
  secure: true,
  auth: {
    user: encodeURIComponent(process.env.PROD_MAIL_USER),
    pass: encodeURIComponent(process.env.PROD_MAIL_PASS),
  },
  logger: true,
  debug: true,
});

const devTransport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const transport =
  process.env.NODE_ENV === "production" ? prodTransport : devTransport;

function generateHTML(resetToken: string) {
  return `
    <div class="email" style="
      padding: 20px;
      color: #ffffff;
      background: #000000;
      font-family: sans-serif;
      line-height: 2;
      font-size: 16px;
    ">
      <div class="card" style="
        max-width: 500px;
        margin: 2rem auto;
        padding: 1rem 2rem;
        border-radius: 1rem;
        background: rgb(29,29,29);
        box-shadow: 0px 10px 25px rgba(29,29,29,0.5);
      ">
        <h2>Hello from HaBits 👋</h2>
        <p>
          Your <b>Password Reset Token</b> is here!
        </p>
        <h3>
          <a href="${frontendURL}/reset?token=${resetToken}" style="color: #75B748">Reset your password.</a>
        </h3>
        <p>HaBits ✅</p>
      </div>
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
  const info = (await transport.sendMail({
    to,
    from: process.env.PROD_MAIL_USER,
    subject: "✅ HaBits – password reset token",
    html: generateHTML(resetToken),
  })) as MailResponse;

  if (process.env.NODE_ENV !== "production") {
    console.log(`💌 Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
