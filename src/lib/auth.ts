// src/lib/auth.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error("Définissez JWT_SECRET dans .env.local");
}

/**
 * Vérifie la présence d'un JWT dans l'en-tête Authorization
 * et que payload.role === "admin". Sinon, lève une erreur.
 */
export function requireAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    throw new Error("Token manquant");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token mal formé");
  }
  const payload = jwt.verify(token, JWT_SECRET) as any;
  if (payload.role !== "admin") {
    throw new Error("Non autorisé");
  }
  return payload;
}
