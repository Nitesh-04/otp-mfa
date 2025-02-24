import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { findUser } from "../../actions/findUser";

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

    return NextResponse.json({ success: true, message: "Login successful! Redirecting to MFA..." });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Error logging in" }, { status: 500 });
  }
}
