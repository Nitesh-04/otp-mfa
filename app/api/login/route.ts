import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { findUser } from "../../actions/findUser";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await findUser(email);
    
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP for Secure-login",
      text: `Your OTP is ${otp}`,
    });

    return NextResponse.json({ success: true, message: "Login successful! Redirecting to MFA..." });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error logging in" }, { status: 500 });
  }
}
