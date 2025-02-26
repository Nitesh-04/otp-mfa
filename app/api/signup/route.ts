import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import redis from "@/lib/redis";
import prisma from "@/utils/db";

export async function POST(req: Request) {
  try {
    const { name, email, password, otp } = await req.json();

    const storedOtp = await redis.get(`otp:${email}`);

    if (!storedOtp || storedOtp !== otp) {
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 401 });
    }

    await redis.del(`otp:${email}`);

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    return NextResponse.json({ success: true, message: "Sign up successful!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error signing up" }, { status: 500 });
  }
}
