export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6">About Us</h1>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to <span className="font-semibold text-indigo-600">Blogify</span> — your one-stop platform for sharing ideas, stories, and knowledge with the world.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          We believe everyone has a voice and something unique to say. Whether you're a passionate writer, a hobbyist, or a professional, Blogify gives you the tools to express yourself freely.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          This platform was built using <span className="font-medium">Next.js, React, and MongoDB</span>, focusing on performance, simplicity, and user experience.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Meet the Developer</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/developer.jpg"
              alt="Developer"
              className="w-28 h-28 rounded-full object-cover shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold">Kshitij Gupta</h3>
              <p className="text-gray-600">
                Full Stack Developer | Passionate about creating impactful web experiences.
              </p>
              <div className="mt-2 flex gap-4">
                <a
                  href="https://www.linkedin.com/in/your-linkedin"
                  className="text-indigo-500 hover:underline"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="text-indigo-500 hover:underline"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Blogify. Built with 💙 by Kshitij Gupta.
        </div>
      </div>
    </div>
  );
}
