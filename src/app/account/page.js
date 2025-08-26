'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      fetchUserPosts(decoded.id);
    } catch (err) {
      console.error('Invalid token:', err);
      router.push('/login');
    }
  }, []);

  const fetchUserPosts = async (userId) => {
    try {
      const res = await fetch(`/api/posts/user/${userId}`);
      const data = await res.json();
      setPosts(data.posts);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-100 to-pink-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">👤 Your Account</h1>

        {user && (
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700">Welcome, <strong>{user.username}</strong>!</p>
            <p className="text-sm text-gray-500">Email: {user.email}</p>
          </div>
        )}

        <h2 className="text-2xl font-semibold text-blue-600 mb-4">📝 Your Posts</h2>

        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post._id} className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
                <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven’t written any blogs yet.</p>
        )}
      </div>
    </div>
  );
}
