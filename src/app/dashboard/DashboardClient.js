'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { defaultPosts } from '@/utils/defaultPosts';

const LS_KEY = 'posts_v1';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw || raw === 'undefined') {
        localStorage.setItem(LS_KEY, JSON.stringify(defaultPosts));
        return defaultPosts;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : defaultPosts;
    } catch {
      localStorage.setItem(LS_KEY, JSON.stringify(defaultPosts));
      return defaultPosts;
    }
  };

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  const fmt = (d) => {
    try { return new Date(d).toLocaleString(); } catch { return String(d || ''); }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">All Posts</h1>
          <Link
            href="/create"
            className="rounded-xl bg-purple-600 px-4 py-2 text-white font-semibold hover:bg-purple-700 transition"
          >
            Create New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-600 py-16">
            <p className="text-lg">No posts yet.</p>
            <p>
              Be the first to{' '}
              <Link href="/create" className="text-purple-700 underline">create one</Link>.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/post/${p.id}`}
                className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden flex flex-col"
              >
                {p.image ? (
                  <img src={p.image} alt={p.title} className="h-44 w-full object-cover" />
                ) : (
                  <div className="h-44 w-full bg-gray-200" />
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg line-clamp-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">{p.content}</p>
                  <div className="mt-auto pt-3 text-xs text-gray-500 flex justify-between">
                    <span>✍️ {p.author || 'Anonymous'}</span>
                    <span>{fmt(p.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
