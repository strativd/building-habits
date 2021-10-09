import { createTransport, getTestMessageUrl } from "nodemailer";

var prodTransport = createTransport({
  host: process.env.PROD_MAIL_HOST,
  port: Number(process.env.PROD_MAIL_PORT),
  auth: {
    user: process.env.PROD_MAIL_USER,
    pass: process.env.PROD_MAIL_PASS,
  },
  secure: true,
  // logger: true,
  // debug: true,
});

const devTransport = createTransport({
  host: process.env.DEV_MAIL_HOST,
  port: Number(process.env.DEV_MAIL_PORT),
  auth: {
    user: process.env.DEV_MAIL_USER,
    pass: process.env.DEV_MAIL_PASS,
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
          <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}" style="color: #75B748">Reset your password.</a>
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
  const info = await transport.sendMail({
    to,
    from: `HaBits <${process.env.PROD_MAIL_USER}>`,
    subject: "HaBits ✅ Password reset token",
    html: generateHTML(resetToken),
  });

  if (process.env.NODE_ENV !== "production") {
    console.log(`💌 Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
