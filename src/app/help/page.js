export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Need Help?</h1>
        <p className="text-gray-700 mb-6">
          We’re here to assist you! If you have any questions, suggestions, or issues regarding the blog platform, feel free to reach out.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium text-gray-800">📧 Email</p>
            <p className="text-blue-600">kshitijgupta.dev@gmail.com</p>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800">💼 LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/kshitijgupta07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              linkedin.com/in/kshitijgupta07
            </a>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Thank you for using our blogging platform 💜
        </p>
      </div>
    </div>
  );
}
