import React, { useEffect, useState } from 'react';
import Layout from './Layout';

export default function Home() {
  // You can replace this with API data later
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Mastering React Basics",
      author: "Gideon Ushindi",
      date: "May 10, 2025",
      avatar: "https://i.pravatar.cc/150?img=3",
      blogImage: "https://i.pravatar.cc/150?img=4",
      content: "React is a powerful JavaScript library for building user interfaces. Start by learning components, state, and props...",
    },
    {
      id: 2,
      title: "Styling with Tailwind CSS",
      author: "Jane Developer",
      date: "May 9, 2025",
      avatar: "https://i.pravatar.cc/150?img=5",
      blogImage: "https://i.pravatar.cc/150?img=5",
      content: "Tailwind CSS gives you utility classes to build responsive and beautiful interfaces quickly and efficiently...",
    },
  ]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 font-serif">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>

        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <img src={blog.blogImage} alt="Blog visual" className="w-full h-60 object-cover" />

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={blog.avatar} alt={blog.author} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{blog.author}</p>
                  <p className="text-sm text-gray-500">{blog.date}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
