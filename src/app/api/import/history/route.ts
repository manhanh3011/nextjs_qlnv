import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";
    const status = searchParams.get("status") ?? "ALL";

    const res = await fetch(`${API_URL}/users/import/history?page=${page}&limit=${limit}&status=${status}`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to get import history",
      },
      { status: 500 },
    );
  }
}
