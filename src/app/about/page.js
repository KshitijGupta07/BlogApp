export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-indigo-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6 text-center">
          About <span className="text-purple-600">Blogify</span>
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-5 text-center">
          Welcome to <span className="font-semibold text-indigo-600">Blogify</span> — your one-stop platform for sharing ideas, stories, and knowledge with the world.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-5 text-center">
          We believe everyone has a voice and something unique to say. Whether you're a passionate writer, a hobbyist, or a professional, Blogify gives you the tools to express yourself freely.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          This platform was built using <span className="font-medium">Next.js, React, and MongoDB</span>, with a strong focus on performance, simplicity, and great user experience.
        </p>

        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-6 text-center">Meet the Developer</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <img
              src="/developer.jpg"
              alt="Developer"
              className="w-32 h-32 rounded-full object-cover shadow-xl ring-4 ring-indigo-200 hover:scale-105 transition-transform duration-300"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-800">Kshitij Gupta</h3>
              <p className="text-gray-600">
                Full Stack Developer | Passionate about building modern, impactful web experiences.
              </p>
              <div className="mt-3 flex justify-center sm:justify-start gap-5">
                <a
                  href="https://www.linkedin.com/in/kshitij-gupta-b6669325b/"
                  className="text-indigo-600 hover:underline font-medium"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/kshitij_2503_/"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 border-t pt-6">
          © {new Date().getFullYear()} Blogify. Built with 💙 by Kshitij Gupta.
        </div>
      </div>
    </div>
  );
}
