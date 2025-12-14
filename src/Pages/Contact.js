import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from './Config/Env';

export default function Contact() {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

 const handleSendMessage = async (e) => {
  e.preventDefault();

  const user_id = localStorage.getItem('user_id');
  if (!user_id) {
    alert("Please sign in to send a message.");
    return;
  }
  setIsSending(true);
  try {
    const response = await axios.post(
      `${API_URL}/send_message/`,
      { message, user_id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log("Message sent successfully:", response.data);
      alert("Message sent!");
      setMessage("");
    } else {
      throw new Error(response.data.message || "Failed to send message");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send message. Please try again later.");
  }
  finally {
    setIsSending(false);
  }
};



  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">
          If you have any questions, feedback, or inquiries, feel free to reach out to us using the form below.
        </p>

        <form onSubmit={handleSendMessage} className="space-y-6 bg-blue-50 p-6 rounded-2xl shadow-md">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Message</label>
            <textarea
              placeholder="Write your message here..."
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
