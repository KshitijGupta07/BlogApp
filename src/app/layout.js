import './globals.css';
import Navbar from '@/components/Navbar';
import SessionWrapper from '@/components/SessionWrapper'; // ✅ JS import

export const metadata = {
  title: 'Blogify',
  description: 'Modern Blogging App with Login & Vlog Features',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <SessionWrapper>
          <Navbar />
          <main className="pt-4 max-w-5xl mx-auto px-4">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
