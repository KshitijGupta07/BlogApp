import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts, { status: 200 });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { title, content, image } = await req.json();

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const created = await Post.create({
    title: title.trim(),
    content: content.trim(),
    image: image || "",
    authorId: session.user.id,
    author: session.user.name || "User",
  });

  // If you fetch with tags on the client, this will revalidate them
  revalidateTag("posts");

  return NextResponse.json(created, { status: 201 });
}
