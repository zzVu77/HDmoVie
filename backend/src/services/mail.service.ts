import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password,
  },
} as nodemailer.TransportOptions)

export async function sendOtpEmail(to: string, otp: string) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
  }

  await transporter.sendMail(mailOptions)
}
