'use client';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/utils/usePosts';

export default function CreatePostPage() {
  const { addPost } = usePosts();
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const id = addPost({
      title: f.title.value.trim(),
      content: f.content.value.trim(),
      image: f.image.value.trim(),
      author: 'You',
    });
    f.reset();
    router.push(`/post/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white/5 p-4 rounded">
        <input name="title" placeholder="Title" className="w-full p-2 rounded bg-white/10" required />
        <input name="image" placeholder="Image URL" className="w-full p-2 rounded bg-white/10" required />
        <textarea name="content" rows={6} placeholder="Write your content..." className="w-full p-2 rounded bg-white/10" required />
        <button className="px-4 py-2 rounded bg-indigo-600 text-white">Publish</button>
      </form>
    </div>
  );
}
