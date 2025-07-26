'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      // Sign out from Google (and other NextAuth providers)
      await signOut({ redirect: false });
      router.push('/');
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  if (status === 'loading') {
    return null; // or show skeleton if you want
  }

  const isLoggedIn = !!session;

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
      <div className="text-2xl font-bold text-white">
        <Link href="/">MyBlog</Link>
      </div>

      <div className="space-x-4 flex items-center text-sm font-medium">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="text-green-400 hover:underline">
              Dashboard
            </Link>
            <Link href="/about" className="hover:underline">About Us</Link>
            <Link href="/help" className="hover:underline">Help</Link>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/about" className="hover:underline">About Us</Link>
            <Link href="/help" className="hover:underline">Help</Link>
            <Link href="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
            <Link href="/login" className="text-green-400 hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
