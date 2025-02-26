import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { findUser } from "../../actions/findUser";
import { generateOtp } from "../_actions/actions";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await findUser(email);
    
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
    }

    generateOtp(email);

    return NextResponse.json({ success: true, message: "Logged in successfully" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error logging in" }, { status: 500 });
  }
}
