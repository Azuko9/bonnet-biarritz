// src/app/api/profiles/route.ts
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/Profile";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  const profiles = await Profile.find().lean();
  return new Response(JSON.stringify(profiles), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    requireAdmin(req);
    const data = await req.json();
    const created = await Profile.create(data);
    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(err.message, { status: 401 });
  }
}
