import React, { useState } from 'react';
import { Menu, X, Bell } from 'lucide-react'; // You can use Heroicons or Lucide for icons
import { Link } from 'react-router-dom';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md font-serif sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">G-Tech</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/blog" className="hover:text-blue-500">Blog</Link></li>
          <li><Link to="/signin" className="hover:text-blue-500">SignIn</Link></li>
          <li><Link to="/post-blog" className="hover:text-blue-500">Post Blog</Link></li>
          <li><Link to="/signup" className="hover:text-blue-500">SignUp</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact Us</Link></li>
          <li><Link to="/shop" className="hover:text-blue-500">Shop</Link></li>
          <li><Link to="/services" className="hover:text-blue-500">Our Services</Link></li>
          <li><Link to="/orders" className="hover:text-blue-500">My Orders</Link></li>
          <li><Link to="/notifications" className="hover:text-blue-500 relative">Notifications</Link> </li>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-4 pb-4">
          <nav className="flex flex-col space-y-2">
          <li><Link to="/" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Home</Link></li>
      <li><Link to="/signin" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>SignIn</Link></li>
      <li><Link to="/signup" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>SignUp</Link></li>
      <li><Link to="/about" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>About Us</Link></li>
      <li><Link to="/contact" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
      <li><Link to="/services" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Our Services</Link></li>
      <li><Link to="/shop" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Shop</Link></li>
      <li><Link to="/orders" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>My Orders</Link></li>
      <li><Link to="/notifications" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Notifications</Link></li>
          </nav>
        </div>
      )}
    </header>
  );
}
