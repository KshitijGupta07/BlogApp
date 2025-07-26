'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setMessage('');
    setIsError(false);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.status === 409) {
      // 🟢 User already exists
      setMessage('User already exists');
      setIsError(false); // Green message
      return;
    }

    if (res.ok) {
      // ✅ Registration success
      router.push('/login');
    } else {
      // 🔴 Unexpected error
      setMessage(data.message || 'Registration failed');
      setIsError(true); // Red message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-fancy">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-6">Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {message && (
          <p className={`text-center mb-4 ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleRegister}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm text-textLight">
          Already have an account?{' '}
          <a href="/login" className="text-accent hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
