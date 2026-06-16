import { deleteUser, getUserById, updateUser } from "@/src/services/userSevice";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const data = await getUserById(Number(id));

    return NextResponse.json(data.users_by_pk);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to get user",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();

    const { id } = await params;

    const data = await updateUser({
      ...body,
      id: Number(id),
    });

    return NextResponse.json(data.update_users_by_pk);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to update user",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const data = await deleteUser(Number(id));

    return NextResponse.json(data.delete_users_by_pk);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to delete user",
      },
      { status: 500 },
    );
  }
}
