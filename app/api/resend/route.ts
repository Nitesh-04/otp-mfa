import { NextResponse } from "next/server";
import { generateOtp } from "../_actions/actions";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    generateOtp(email);

    return NextResponse.json({ success: true, message: "OTP sent!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error sending OTP" }, { status: 500 });
  }
}