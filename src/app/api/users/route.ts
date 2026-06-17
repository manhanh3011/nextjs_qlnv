import { createUser, getUsers } from "@/src/services/userSevice";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await getUsers();
        return NextResponse.json(data.allUsers.nodes);
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
        const data = await createUser(body);
        
        return NextResponse.json(data.createUser.user);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Failed to create user" },
            { status: 500 }
        );
    }
}
