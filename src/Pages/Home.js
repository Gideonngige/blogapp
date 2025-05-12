import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get_blog_posts/');
        const posts = response.data.posts;

        // Optional: add dummy author/date/avatar if not in backend
        const enriched = posts.map(post => ({
          ...post,
          author: "Gideon Ushindi", // Replace or enhance as needed
          date: new Date().toLocaleDateString(),
          avatar: "https://i.pravatar.cc/150?img=3",
          blogImage: post.image, // image from Cloudinary URL
        }));

        setBlogs(enriched);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

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
