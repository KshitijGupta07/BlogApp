// app/api/posts/[id]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";

function badId(id) {
  return !id || !mongoose.Types.ObjectId.isValid(id);
}

export async function GET(_req, { params }) {
  await connectDB();

  if (badId(params.id)) {
    return NextResponse.json({ message: "Invalid post id" }, { status: 400 });
  }

  try {
    const post = await Post.findById(params.id).lean();
    if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ message: "Failed to get post" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();

  if (badId(params.id)) {
    return NextResponse.json({ message: "Invalid post id" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const existing = await Post.findById(params.id);
    if (!existing) return NextResponse.json({ message: "Post not found" }, { status: 404 });

    // Only author can update
    if (String(existing.authorId) !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updated = await Post.findByIdAndUpdate(params.id, body, { new: true });
    revalidateTag("posts"); // if you fetch lists with next: { tags: ['posts'] }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();

  if (badId(params.id)) {
    return NextResponse.json({ message: "Invalid post id" }, { status: 400 });
  }

  try {
    const post = await Post.findById(params.id);
    if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });

    // Only author can delete
    if (String(post.authorId) !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await post.deleteOne();
    revalidateTag("posts");
    return NextResponse.json({ message: "Post deleted" });
  } catch {
    return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
  }
}
