// src/app/api/profiles/[id]/route.ts
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/Profile";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const prof = await Profile.findById(params.id).lean();
  return prof
    ? new Response(JSON.stringify(prof), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    : new Response("Profil non trouvé", { status: 404 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    requireAdmin(req);
    const data = await req.json();
    const updated = await Profile.findByIdAndUpdate(params.id, data, {
      new: true,
    }).lean();
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(err.message, { status: 401 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    requireAdmin(req);
    await Profile.findByIdAndDelete(params.id);
    return new Response(null, { status: 204 });
  } catch (err: any) {
    return new Response(err.message, { status: 401 });
  }
}
