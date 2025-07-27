'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
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
        <Link href="/about" className="hover:underline">About Us</Link>
        <Link href="/help" className="hover:underline">Help</Link>

        {status === 'loading' ? (
          <span className="text-gray-400">Loading...</span>
        ) : !user ? (
          <>
            <Link href="/register" className="text-blue-400 hover:underline">Register</Link>
            <Link href="/login" className="text-green-400 hover:underline">Login</Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-300"></span>
            <button onClick={handleLogout} className="text-red-400 hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
