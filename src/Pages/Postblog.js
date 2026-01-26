import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from './Config/Env';
import Swal from "sweetalert2";

export default function PostBlog() {
  const user_id = localStorage.getItem('user_id');
  const [isposting, setIsPosting] = useState(false);
  // alert("UserId: " + user_id);
  const [form, setForm] = useState({
    title: '',
    image: null,
    content: '',
    user_id: user_id || '',
  });

  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    if (!form.user_id) {
      // use sweetalert2 to show the alert
      Swal.fire({
        icon: 'warning',
        title: 'Not Signed In',
        text: 'Please sign in to post a blog.',
      });
      return;
    }


    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('image', form.image);
    formData.append('user_id', form.user_id);
    setIsPosting(true);
    try {
      const response = await axios.post(
        `${API_URL}/postblog/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // use sweetalert2 to show success
      Swal.fire({
        icon: 'success',
        title: 'Blog Posted',
        text: 'Your blog has been posted successfully!',
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Blog posted successfully!');
        // use sweetalert2 to show success
        Swal.fire({
          icon: 'success',
          title: 'Blog Posted',
          text: 'Your blog has been posted successfully!',
        });
        setForm({ title: '', image: null, content: '' });
        console.log('Blog posted successfully:', response.data);
      }

      
    } catch (error) {
      console.error(error);
      setMessage('Failed to post blog. Check console for errors.');
      // use sweetalert2 to show error
      Swal.fire({
        icon: 'error',
        title: 'Post Failed',
        text: 'There was an error posting your blog. Please try again later.',
      });
    }
    finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Post a New Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Content</label>
            <textarea
              name="content"
              rows="6"
              value={form.content}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isposting ? 'Posting...' : 'Post Blog'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}
