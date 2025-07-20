"use client";

import { useState } from "react";
import { defaultPosts } from "@/utils/defaultPosts";

export default function DashboardPage() {
  const [posts, setPosts] = useState(defaultPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleCreateVlog = () => {
    if (!title || !content || !image) return alert("All fields are required!");

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
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Welcome to Your Dashboard</h1>

      {/* --- Create Vlog Form --- */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a Vlog</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded mb-3 h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded mb-3"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          onClick={handleCreateVlog}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Post Vlog
        </button>
      </div>

      {/* --- Blog Grid --- */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Blogs</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
              <p className="text-xs text-gray-500 mt-3">By {post.author} | {post.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
