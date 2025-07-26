'use client';

import { useState } from "react";
import { defaultPosts } from "@/utils/defaultPosts";
import Link from "next/link";

export default function DashboardClient() {
  const [posts, setPosts] = useState(defaultPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleCreateVlog = () => {
    if (!title || !content || !image) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
      return;
    }

    const newPost = {
      title,
      content,
      image,
      author: "You",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setImage("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700 tracking-wide">Welcome to Your Dashboard</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-12 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">✍️ Create a New Vlog</h2>

        {showError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-pulse">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">All fields are required!</span>
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="What's on your mind..."
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL (must be valid)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button
            onClick={handleCreateVlog}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            🚀 Post Vlog
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">🔥 Top Blogs</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Link key={index} href={`/post/${index}`}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer border border-gray-200">
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover transform hover:scale-105 transition duration-300 ease-in-out"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.content.slice(0, 150)}...
                </p>
                <div className="mt-4 text-sm text-gray-500">By {post.author} • {post.createdAt}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
