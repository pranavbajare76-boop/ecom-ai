import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import LoginAttempt from "@/models/loginAttempt";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const email = body?.email || "unknown";

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "";

    const attempt = await LoginAttempt.create({ email, ip, userAgent });
    return NextResponse.json({ success: true, attempt }, { status: 201 });
  } catch (error) {
    console.error("/api/auth/login error", error);
    return NextResponse.json({ error: "Failed to record login" }, { status: 500 });
  }
}
