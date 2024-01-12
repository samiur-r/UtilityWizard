import config from "@/config";
import { Resend } from "resend";

const resend = new Resend(`${config.resendApiKey}`);
const domain = config.appUrl;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: config.resendDeliveryEmail,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
