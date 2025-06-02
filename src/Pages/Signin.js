import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://myblogbackend-phgi.onrender.com/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Successfully signed in');
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('email', form.email);
        navigate('/'); // Redirect to home page after successful sign-in
        if(form.email === "deliveryperson@gtech.com"){
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('email', form.email);
          navigate('/delivery-orders'); // Redirect to delivery orders page for delivery person
        }
        else if(form.email === "admin@gtech.com"){
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('email', form.email);
          navigate('/dashboard'); // Redirect to admin page for super admin
        }
        else{
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('email', form.email);
          navigate('/'); // Redirect to home page for regular users
        }
      } else {
        setMessage(data.message || 'Sign in failed');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setMessage('An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-serif">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* forgot your paswword */}
          <div className="text-right text-sm">
            <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</a>
            </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white transition ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
