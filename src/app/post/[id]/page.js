'use client';

import { useEffect, useState, useMemo, use } from 'react'; // ⬅️ added `use`
import { useRouter } from 'next/navigation';
import { defaultPosts } from '@/utils/defaultPosts';

// same key used in your usePosts.js
const LS_KEY = 'posts_v1';

export default function PostPage({ params }) {
  const router = useRouter();

  // ⬅️ unwrap the promise-like `params` object
  const { id } = use(params);

  const [post, setPost] = useState(null);

  // Load posts from localStorage, seed with defaults if empty/corrupt
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
      // if parse fails, reset to defaults
      localStorage.setItem(LS_KEY, JSON.stringify(defaultPosts));
      return defaultPosts;
    }
  };

  // Find post by id; if id is numeric, also try index as a fallback
  const findPost = (all, id) => {
    if (!id) return null;

    // try UUID/string id
    const byId = all.find((p) => String(p.id) === String(id));
    if (byId) return byId;

    // legacy fallback: numeric index (e.g., /post/0)
    const maybeIndex = Number.isNaN(Number(id)) ? null : parseInt(id, 10);
    if (maybeIndex !== null && maybeIndex >= 0 && maybeIndex < all.length) {
      return all[maybeIndex];
    }

    // as a final fallback, check defaults by id
    const fromDefaults = defaultPosts.find((p) => String(p.id) === String(id));
    return fromDefaults || null;
  };

  useEffect(() => {
    if (!id) return;
    const all = loadPosts();
    const p = findPost(all, id);
    setPost(p || null);
  }, [id]);

  const formattedDate = useMemo(() => {
    if (!post?.createdAt) return '';
    try {
      return new Date(post.createdAt).toLocaleString();
    } catch {
      return String(post.createdAt);
    }
  }, [post]);

  const onDelete = () => {
    if (!post) return;
    if (!confirm('Delete this post?')) return;

    const all = loadPosts();
    const next = all.filter((p) => String(p.id) !== String(post.id));
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    router.push('/');
  };

  if (!post) {
    return (
      <div className="p-6 text-center text-red-600">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <p>The post you're looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
        />

        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">{post.title}</h1>

          <p className="text-gray-700 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
            {post.content}
          </p>

          <div className="flex flex-wrap justify-between items-center gap-3 text-sm text-gray-500 border-t pt-4">
            <span>
              ✍️ By <span className="text-indigo-600 font-semibold">{post.author || 'Anonymous'}</span>
            </span>
            <span>📅 {formattedDate}</span>
          </div>

          {/* Delete button (optional). Remove if you only want it on the homepage. */}
          <div className="mt-6">
            <button
              onClick={onDelete}
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
