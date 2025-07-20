import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const post = await Post.findById(params.id);
    if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Failed to get post" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const body = await req.json();
    const updatedPost = await Post.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
  }
}
