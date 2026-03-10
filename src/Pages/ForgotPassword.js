// forgot pasword page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './Config/Env';
import Swal from "sweetalert2";

export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSending(true);
        try {
        const response = await axios.get(`${API_URL}/resetpassword/${email}/`);
        setMessage(response.data.message || 'Password reset link sent to your email');
        // use sweetalert2 to show success
        Swal.fire({
            icon: 'success',
            title: 'Email Sent',
            text: 'Password reset link has been sent to your email.',
        });
        setEmail('');
        // Optionally redirect to sign-in page
        navigate('/signin');
        } catch (error) {
        console.error('Error:', error);
        setMessage('Failed to send password reset link. Please try again.');
        // use sweetalert2 to show error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to send password reset link. Please try again later.',        
        });
        } finally {
        setSending(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

    {/* Logo */}
    <div className="flex justify-center mb-4">
      <img
        src="/logo.png"  // <-- Replace with your Nexindi Tech logo path
        alt="Nexindi Tech"
        className="h-16 w-16 object-contain"
      />
    </div>

    {/* Page Title */}
    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
      Forgot Password
    </h2>
    {/* <hr className="mb-10" /> */}

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          placeholder="e.g johndoe@example.com"
          type="email"
          value={email}
          onChange={handleChange}
          required
          className="w-full mb-8 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {sending ? "Sending..." : "Send Reset Link"}
      </button>
    </form>

    {message && (
      <p className="mt-4 text-center text-red-600">{message}</p>
    )}

    <p className="mt-4 text-center text-sm text-gray-600">
      Remembered your password?{" "}
      <a href="/signin" className="text-blue-600 hover:underline">
        Sign In
      </a>
    </p>
  </div>
</div>
    );
    }