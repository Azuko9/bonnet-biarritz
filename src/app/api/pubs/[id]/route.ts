import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Pub from "@/models/Pub";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: any) {
  try {
    await dbConnect();
    requireAdmin(req);
    const updated = await Pub.findByIdAndUpdate(params.id, await req.json(), {
      new: true,
    }).lean();
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    await dbConnect();
    requireAdmin(req);
    await Pub.findByIdAndDelete(params.id);
    return new Response(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
