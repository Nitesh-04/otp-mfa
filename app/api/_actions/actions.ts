import redis from "@/lib/redis";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function generateOtp(email: string)
{
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await redis.set(`otp:${email}`, otp, "EX", 180);

        await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Your OTP for Secure-login",
        text: `Your OTP is ${otp}`,
        });
        
    } catch (error) {
        console.error(error);
    }
}