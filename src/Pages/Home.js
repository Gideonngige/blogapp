import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://myblogbackend-phgi.onrender.com/get_blog_posts/');
      const posts = response.data.posts;
      const enriched = posts.map(post => ({
        ...post,
        author: post.name,
        date: post.created_at.split('T')[0],
        avatar: post.profile_image || 'https://via.placeholder.com/150',
        blogImage: post.image,
      }));
      setBlogs(enriched);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLike = async (blog_id) => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      alert("Please sign in to like a blog.");
      return;
    }
    try {
      const response = await axios.get(`https://myblogbackend-phgi.onrender.com/like_blog_post/${user_id}/${blog_id}/`);
      if (response.status === 200) {
        fetchBlogs(); // Refresh blogs to show updated likes
      }
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 font-serif">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>
        {loading && <p className="text-center text-gray-500">Loading blogs...</p>}
        {!loading && blogs.length === 0 && (
          <p className="text-center text-gray-500">No blogs available at the moment.</p>
        )}

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
              <button
                onClick={() => handleLike(blog.id)}
                className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors mt-4"
              >
                👍 {blog.likes_count} Likes
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
