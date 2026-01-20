import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useContext } from "react";
import { UserContext } from './Context/UserContext';
import { API_URL } from './Config/Env';


export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 new state

  const { loginUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${API_URL}/signin/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Successfully signed in');
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('email', form.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('phone', data.phone_number);
        localStorage.setItem('profile_image', data.profile_image);
        localStorage.setItem('is_verified', data.is_verified);
        localStorage.setItem('role', data.role);

        const userData = {
  user_id: data.user_id,
  name: data.name,
  phone: data.phone,
  email: form.email,
  token: data.token,
  profile_image: data.profile_image,
  is_verified: data.is_verified,
  role: data.role
};
    // Save globally
  localStorage.setItem("user", JSON.stringify(userData));

  // Update context -> Header updates instantly
  loginUser(userData);

        if (data.role === "deliveryperson" && data.is_verified === true){
          navigate('/delivery-orders');
        } 
        else if (data.role === "admin" && data.is_verified === true){
          navigate('/dashboard');

        } 
        else navigate('/');

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Sign In</h2><hr className='mb-10'/>

        {message && (
          <div className="mb-4 text-center text-sm text-red-600">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              placeholder="e.g johndoe@example.com"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password with Eye Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                placeholder="Your password"
                type={showPassword ? "text" : "password"} // 👈 toggle type
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <HiEyeOff size={20}/> : <HiEye size={20}/>}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right text-sm">
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white transition ${loading ? 'bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`}
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
