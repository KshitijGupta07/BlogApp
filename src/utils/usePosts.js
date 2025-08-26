// utils/usePosts.js
'use client';
import { useEffect, useState } from 'react';
import { defaultPosts } from './defaultPosts';

const LS_KEY = 'posts_v1';

const safeParse = (raw, fallback = []) => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const genId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function usePosts() {
  const [posts, setPosts] = useState([]);

  // hydrate & seed once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const raw = localStorage.getItem(LS_KEY);
    const stored = raw ? safeParse(raw, []) : [];

    // If nothing stored, seed with defaults
    const initial = stored.length ? stored : defaultPosts;
    setPosts(initial);
    localStorage.setItem(LS_KEY, JSON.stringify(initial));

    // keep in sync across tabs
    const onStorage = (e) => {
      if (e.key === LS_KEY && e.newValue) {
        setPosts(safeParse(e.newValue, []));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const save = (updater) => {
    setPosts((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const addPost = ({ title, content, image, author = 'You' }) => {
    const newPost = {
      id: genId(),
      title: String(title).trim(),
      content: String(content).trim(),
      image: String(image).trim(),
      author,
      createdAt: new Date().toISOString(),
    };
    save((prev) => [newPost, ...prev]);
    return newPost.id;
  };

  const updatePost = (id, patch) => {
    save((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  };

  const deletePost = (id) => {
    save((prev) => prev.filter((p) => p.id !== id));
  };

  const getById = (id) => posts.find((p) => p.id === id);

  return { posts, addPost, updatePost, deletePost, getById };
}
