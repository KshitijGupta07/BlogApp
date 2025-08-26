// app/page.js
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col items-center">
      {/* Hero / Intro */}
      <section className="py-16 text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-purple-600">
          Welcome to Blogify
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          A beautiful platform to express yourself. Share your thoughts, tutorials,
          life stories, and opinions with the world.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-purple-600 px-6 py-3 text-white shadow"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border px-6 py-3 text-gray-700 hover:bg-blue-100"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Featured images */}
      <section className="w-full max-w-5xl px-6 pb-16">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Featured</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl overflow-hidden shadow border bg-white">
            <Image
              src="/blog1.jpg"
              alt="Featured blog 1"
              width={1200}
              height={800}
              className="h-56 w-full object-cover"
              priority
            />
            <div className="p-4">
              <h3 className="font-semibold">Inspiration & Ideas</h3>
              {/* Optional link to a static page or post */}
              {/* <Link href="/post/slug-1" className="text-purple-600">Read more</Link> */}
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl overflow-hidden shadow border bg-white">
            <Image
              src="/blog2.jpg"
              alt="Featured blog 2"
              width={1200}
              height={800}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Tech & Tutorials</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl overflow-hidden shadow border bg-white">
            <Image
              src="/blog3.png"
              alt="Featured blog 3"
              width={1200}
              height={800}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Stories & Life</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
