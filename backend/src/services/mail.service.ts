import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

// Sử dụng process.env để lấy giá trị từ file .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendOtpEmail(to: string, otp: string) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
  }

  await transporter.sendMail(mailOptions)
}
