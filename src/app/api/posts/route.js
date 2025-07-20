import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const newPost = new Post(body);
    await newPost.save();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create post" }, { status: 500 });
  }
}
