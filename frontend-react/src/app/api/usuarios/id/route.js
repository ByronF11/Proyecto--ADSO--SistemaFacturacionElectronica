import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function GET(_, { params }) {
  const res = await fetch(`${API_BASE}/usuarios/${params.id}`);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(request, { params }) {
  const body = await request.json();

  const res = await fetch(`${API_BASE}/usuarios/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(_, { params }) {
  const res = await fetch(`${API_BASE}/usuarios/${params.id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
