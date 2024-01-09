import nodemailer from 'nodemailer'

export default async function sendEmail(
  to: string,
  subject: string,
  html?: string,
  text?: string
) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_EMAIL,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,

      },
    })

    await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to,
      subject,
      html,
      text,
    })
  } catch (error) {
    console.log(error)
  }
}
