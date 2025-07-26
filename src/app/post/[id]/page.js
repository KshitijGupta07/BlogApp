import { defaultPosts } from "@/utils/defaultPosts";

export default function PostPage({ params }) {
  const { id } = params;
  const post = defaultPosts[parseInt(id)];

  if (!post) {
    return (
      <div className="p-6 text-center text-red-600">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <p>The post you're looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
        />

        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">{post.title}</h1>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {post.content}
          </p>

          <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
            <span>
              ✍️ By <span className="text-indigo-600 font-semibold">{post.author}</span>
            </span>
            <span>📅 {post.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
