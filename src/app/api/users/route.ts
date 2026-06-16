import { createUser, getUsers } from "@/src/services/userSevice";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await getUsers();
        return NextResponse.json(data.users);
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
        console.log("body", body);

        const data = await createUser(body);
        console.log("result", data);
        return NextResponse.json(data.insert_users_one);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Failed to create user" },
            { status: 500 }
        );
    }
}
