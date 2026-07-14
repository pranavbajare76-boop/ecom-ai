import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import LoginAttempt from "@/models/loginAttempt";

export async function GET() {
  try {
    await connectDB();
    const list = await LoginAttempt.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(list);
  } catch (error) {
    console.error("/api/auth/logins error", error);
    return NextResponse.json({ error: "Failed to fetch logins" }, { status: 500 });
  }
}
