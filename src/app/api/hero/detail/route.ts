import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Hero ID is required" }, { status: 400 });
    }

    const apiBase = process.env.ML_API_BASE_DETAIL; // Mengambil URL untuk detail hero
    if (!apiBase) {
      throw new Error("API base URL for detail is not set");
    }

    const response = await fetch(`${apiBase}?id=${id}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch hero details:", error);
    return NextResponse.json({ error: "Failed to fetch hero details" }, { status: 500 });
  }
}
