'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import DashboardPage from '../dashboard/page';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      console.log(session)
      if (session) {
        router.push('/dashboard');
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async () => {
  if (!username || !password) {
    setError('All fields are required');
    return;
  }

  setIsLoading(true);
  try {
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    
    });

    if (result?.error) {
      setError('Invalid username or password');
    } else {
      router.push('/dashboard');
    }
  } catch (err) {
    setError('An error occurred during login.');
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

const handleGoogleLogin = () => {
  if (typeof window === 'undefined') {
    console.error('❌ Window is not defined');
    return;
  }

  const origin = window.location.origin;
  const callbackUrl = `${origin}/dashboard`;

  try {
    // ✅ Validate the URL before using
    new URL(callbackUrl);
    console.log("✅ Google login redirecting to:", callbackUrl);
    signIn('google', { callbackUrl });
  } catch (error) {
    console.error('❌ Invalid callback URL:', callbackUrl, error);
  }
};



  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Login to Blogify</h1>

      {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 border border-gray-300 rounded mb-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className={`w-full py-2 rounded mb-3 text-white transition ${
          isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">New here?</span>
        <button onClick={handleRegister} className="text-indigo-600 text-sm hover:underline">
          Register
        </button>
      </div>

      <div className="relative my-4">
        <hr className="border-t border-gray-300" />
        <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-400 text-sm">
          OR
        </span>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full border border-gray-300 py-2 rounded flex items-center justify-center hover:bg-gray-100 transition"
      >
        <img src="/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
        Continue with Google
      </button>
    </div>
  );
}
