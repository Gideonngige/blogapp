// forgot pasword page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        const response = await axios.get(`https://myblogbackend-phgi.onrender.com/resetpassword/${email}/`);
        setMessage(response.data.message || 'Password reset link sent to your email');
        alert(response.data.message || 'Password reset link sent to your email');
        setEmail('');
        // Optionally redirect to sign-in page
        navigate('/signin');
        } catch (error) {
        console.error('Error:', error);
        setMessage('Failed to send password reset link. Please try again.');
        alert('Failed to send password reset link. Please try again.');
        }
        finally {
        setSending(false);
        }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
                placeholder='e.g johndoe@example.com'
                type="email"
                value={email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
            {sending ? 'Sending...' : 'Send Reset Link'}
            </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </div>
    );
    }