'use client';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Need Help?</h1>
        <p className="text-gray-700 mb-6">
          We’re here to assist you! If you have any questions, suggestions, or issues regarding the blog platform, feel free to reach out.
        </p>

        {/* Navigation Links */}
        <div className="mb-8 flex justify-center gap-6 text-purple-600 font-medium">
          <Link href="/dashboard" className="hover:underline">
            🔗 Dashboard
          </Link>
          <Link href="/about" className="hover:underline">
            🔗 About
          </Link>
        </div>

        {/* Contact Section */}
        <div className="space-y-4 text-left">
          <div>
            <p className="text-lg font-medium text-gray-800">📧 Email</p>
            <p className="text-blue-600">kshitijvgupta.@gmail.com</p>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800">📷 Instagram</p>
            <a
              href="https://www.instagram.com/kshitij_2503_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
            kshitij_2503_
            </a>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800">💼 LinkedIn</p>
            <a
              href="nkedin.com/in/kshitij-gupta-b6669325b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              linkedin.com/in/kshitijgupta07
            </a>
          </div>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Thank you for using our blogging platform 💜
        </p>
      </div>
    </div>
  );
}
