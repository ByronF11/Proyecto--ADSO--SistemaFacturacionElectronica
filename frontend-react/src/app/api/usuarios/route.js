import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function GET() {
  const res = await fetch(`${API_BASE}/usuarios`);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();

  const res = await fetch(`${API_BASE}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
