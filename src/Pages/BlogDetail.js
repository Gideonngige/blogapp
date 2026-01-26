import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import { API_URL } from './Config/Env';
import Swal from "sweetalert2";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_URL}/get_blog_post/${id}/`);
      setBlog(res.data.post);
    } catch (error) {
      console.error('Error fetching blog:', error);
      // use sweetalert2 to show error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load blog post. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleLike = async (blog_id) => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      // alert("Please sign in to like a blog.");
      // use sweetalert2 to show the alert
      Swal.fire({
        icon: 'warning',
        title: 'Not Signed In',
        text: 'Please sign in to like a blog.',
      });
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/like_blog_post/${user_id}/${blog_id}/`);
      if (response.status === 200) {
        fetchBlog(); // Refresh blogs to show updated likes
      }
    } catch (error) {
      console.error('Error liking blog:', error);
      // use sweetalert2 to show error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to like the blog post. Please try again later.',
      });
    }
  };

  if (loading) return <Layout><p className="text-center">Loading...</p></Layout>;

  if (!blog) return <Layout><p className="text-center">Blog not found.</p></Layout>;

  return (
    
      <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden m-8">
            <img src={`${API_URL}${blog.image}`} alt="Blog visual" className="w-full h-60 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={`${API_URL}${blog.profile_image}`} alt={blog.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold font-serif">{blog.name}</p>
                  <p className="text-sm text-gray-500">{new Date(blog.created_at).toLocaleString()}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 font-serif">{blog.title}</h3>
              <p className="text-gray-700 font-serif">
                {blog.content}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleLike(blog.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  👍 {blog.likes_count} Likes
                </button>
              </div>
            </div>
          </div>
   
  );
}
