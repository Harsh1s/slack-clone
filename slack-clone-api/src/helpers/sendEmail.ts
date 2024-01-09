import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

export default async function sendEmail(
  to: string,
  subject: string,
  html?: string,
  text?: string
) {
  try {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID_B,
      process.env.GOOGLE_CLIENT_SECRET_B,
      "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_EMAIL,
        accessToken: accessToken.token,
      },
    });

    await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to,
      subject,
      html,
      text,
    });
  } catch (error) {
    console.log(error);
  }
}