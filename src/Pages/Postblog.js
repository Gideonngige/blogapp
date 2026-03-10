import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./Config/Env";
import Swal from "sweetalert2";

export default function PostBlog() {
  const user_id = localStorage.getItem("user_id");
  const [isposting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    image: null,
    content: "",
    user_id: user_id || "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    const file = files[0];

    if (file) {
      // Check file size (2 MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "Image size must not exceed 2 MB.",
        });
        // Clear the input
        e.target.value = null;
        setForm({ ...form, image: null });
        setImagePreview(null);
        return;
      }

      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  } else {
    setForm({ ...form, [name]: value });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user_id) {
      Swal.fire({
        icon: "warning",
        title: "Not Signed In",
        text: "Please sign in to post a blog.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("image", form.image);
    formData.append("user_id", form.user_id);

    setIsPosting(true);

    try {
      const response = await axios.post(`${API_URL}/postblog/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Blog Posted",
        text: "Your blog has been posted successfully!",
      });

      if (response.status === 200 || response.status === 201) {
        setForm({ title: "", image: null, content: "" });
        setImagePreview(null);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Post Failed",
        text: "There was an error posting your blog.",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Write a Blog Post
          </h1>
          <p className="text-gray-500 mt-1">
            Share your knowledge, ideas, or experience with the community.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              required
              onChange={handleChange}
              placeholder="Enter blog title..."
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mx-auto max-h-60 rounded-lg mb-4"
                />
              ) : (
                <p className="text-gray-500 mb-3">
                  Upload a blog cover image
                </p>
              )}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="block mx-auto text-sm"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Content
            </label>

            <textarea
              name="content"
              rows="8"
              value={form.content}
              required
              onChange={handleChange}
              placeholder="Write your blog content here..."
              className="w-full border border-gray-300 px-4 py-3 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition flex justify-center items-center"
          >
            {isposting ? "Posting..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}