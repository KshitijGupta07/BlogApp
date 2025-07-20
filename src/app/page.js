// app/page.js
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to Blogify</h1>
        <p className="text-lg mb-6">
          Blogify is a simple, beautiful platform to share your thoughts, tutorials, life stories, and opinions with the world.
        </p>

        {!user && (
          <Link href="/login">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
              Login to Get Started
            </button>
          </Link>
        )}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Image src="/blog1.jpg" alt="blog example" width={400} height={250} className="rounded-lg" />
          <Image src="/blog2.jpg" alt="write blog" width={400} height={250} className="rounded-lg" />
          <Image src="/blog3.png" alt="publish blog" width={400} height={250} className="rounded-lg" />
        </div>
      </div>

      <footer className="bg-indigo-600 text-white text-center py-4 mt-10">
        <p>&copy; {new Date().getFullYear()} Blogify. Built with ❤️ by Kshitij Gupta.</p>
      </footer>
    </div>
  );
}
