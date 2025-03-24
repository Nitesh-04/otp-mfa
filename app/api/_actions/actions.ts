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
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        const length = 8;
        let otp = '';
        
        while (otp.length < length) {
            const byte = new Uint32Array(1);
            crypto.getRandomValues(byte);
            const index = byte[0] % chars.length;
            otp += chars[index];
        }

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