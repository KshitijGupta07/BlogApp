'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname(); // ⬅️ used to detect route changes

  // Refresh user info on every route change
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [pathname]); // ⬅️ will rerun every time the route changes

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      <div className="text-2xl font-bold">MyBlog</div>
      <div className="space-x-4">
        <Link href="/about">About Us</Link>
        <Link href="/help">Help</Link>
        {user && (
          <button onClick={handleLogout} className="text-red-400 font-semibold">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
