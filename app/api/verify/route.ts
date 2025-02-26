import { NextResponse } from "next/server";
import { generateOtp } from "../_actions/actions";
import prisma from "@/utils/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        });

    if (user) {
        return NextResponse.json({ success: false, message: "User already exists" }, { status: 401 });
    }

    await generateOtp(email);

    return NextResponse.json({ success: true, message: "OTP sent!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error sending OTP" }, { status: 500 });
  }
}
