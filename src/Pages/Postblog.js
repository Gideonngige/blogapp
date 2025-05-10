import React, { useState } from 'react';

export default function PostBlog() {
  const [form, setForm] = useState({
    title: '',
    image: null,
    content: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., send to Django backend)
    console.log('Post blog:', form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-serif">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Post a New Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
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
              required
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}
