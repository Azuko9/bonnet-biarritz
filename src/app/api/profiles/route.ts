import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/Profile";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  const profiles = await Profile.find().lean();
  return NextResponse.json(profiles);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    requireAdmin(req);
    const data = await req.json();
    const created = await Profile.create(data);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
