import redis from "@/lib/redis";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const storedOtp = await redis.get(`otp:${email}`);

    if (!storedOtp) {
      return NextResponse.json(
        { success: false, message: "OTP expired or not found" },
        { status: 400 }
      );
    }

    if (storedOtp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    await redis.del(`otp:${email}`);

    return NextResponse.json({ success: true, message: "MFA successful!" });

  } 
  catch (error) 
  {
    return NextResponse.json(
      { success: false, message: "Error verifying OTP" },
      { status: 500 }
    );
  }
}
