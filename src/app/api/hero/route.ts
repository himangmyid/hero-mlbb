import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiBase = process.env.ML_API_BASE_LIST; // Mengambil URL untuk list heroes
    if (!apiBase) {
      throw new Error("API base URL for list is not set");
    }

    const response = await fetch(apiBase);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch heroes:", error);
    return NextResponse.json({ error: "Failed to fetch heroes" }, { status: 500 });
  }
}
