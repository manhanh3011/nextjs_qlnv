import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        
        const page = searchParams.get("page") ?? "1";
        const limit = searchParams.get("limit") ?? "10";

        const res = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`, {
            cache: 'no-store',
        })

        const data = await res.json();
        if (!res.ok) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data.allUsers?.nodes ?? data);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Failed to get users" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        
        if (!res.ok) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data.createUser?.user ?? data);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Failed to create user" },
            { status: 500 }
        );
    }
}
