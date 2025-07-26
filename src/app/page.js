'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (!updatedUser || updatedUser === 'undefined') {
        setUser(null); // show login button again
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-white to-indigo-100 min-h-screen text-gray-800 overflow-hidden">
      <div className="absolute top-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 -right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 leading-tight drop-shadow-md">
          Welcome to <span className="text-purple-600">Blogify</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          A beautiful platform to express yourself. Share your thoughts, tutorials, life stories, and opinions with the world.
        </p>

        {!user && (
          <Link href="/login">
            <button className="bg-indigo-600 text-white px-8 py-3 text-lg rounded-lg shadow hover:bg-indigo-700 transition-all duration-300">
              Login to Get Started
            </button>
          </Link>
        )}

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="transition transform hover:-translate-y-1 hover:shadow-xl">
            <Image src="/blog1.jpg" alt="blog example" width={400} height={250} className="rounded-lg" />
          </div>
          <div className="transition transform hover:-translate-y-1 hover:shadow-xl">
            <Image src="/blog2.jpg" alt="write blog" width={400} height={250} className="rounded-lg" />
          </div>
          <div className="transition transform hover:-translate-y-1 hover:shadow-xl">
            <Image src="/blog3.png" alt="publish blog" width={400} height={250} className="rounded-lg" />
          </div>
        </div>
      </div>

      <footer className="relative z-10 bg-indigo-600 text-white text-center py-5 mt-12 shadow-inner">
        <p>&copy; {new Date().getFullYear()} Blogify. Built with ❤️ by Kshitij Gupta.</p>
      </footer>
    </div>
  );
}
