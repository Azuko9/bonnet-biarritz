import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await dbConnect();
  const user = await User.findOne({ email });
  if (
    !user ||
    user.role !== "admin" ||
    !(await user.comparePassword(password))
  ) {
    return NextResponse.json(
      { error: "Identifiants invalides" },
      { status: 401 }
    );
  }
  const token = jwt.sign(
    { sub: user._id.toString(), role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
  return NextResponse.json({ token }, { status: 200 });
}
