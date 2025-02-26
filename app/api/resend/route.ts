import { NextResponse } from "next/server";
import { generateOtp } from "../_actions/actions";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const storedOtp = await redis.get(`otp:${email}`);

    if (storedOtp)
    {
       await redis.del(`otp:${email}`);
    }
    
    generateOtp(email);

    return NextResponse.json({ success: true, message: "OTP sent!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error sending OTP" }, { status: 500 });
  }
}