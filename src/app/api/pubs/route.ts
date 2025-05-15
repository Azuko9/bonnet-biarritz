import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Pub from "@/models/Pub";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const pubs = await Pub.find().sort({ order: 1 }).lean();
  return NextResponse.json(pubs);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    requireAdmin(req);
    const data = await req.json();
    const created = await Pub.create(data);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
