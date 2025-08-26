'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user;

  const handleLogout = () => {
    signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="bg-black text-white flex justify-between px-6 py-3 items-center">
      <h1 className="text-2xl font-bold">MyBlog</h1>

      <div className="flex gap-4 items-center">
        <Link href="/about" className="hover:underline">
          About Us
        </Link>
        <Link href="/help" className="hover:underline">
          Help
        </Link>

        {status === 'loading' ? (
          <span className="text-gray-400">Loading...</span>
        ) : !user ? (
          <>
            <Link href="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
            <Link href="/login" className="text-green-400 hover:underline">
              Login
            </Link>
          </>
        ) : (
          <>
            {/* 👇 Show Home & Dashboard only if logged in */}
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-400 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
