import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // You can use Heroicons or Lucide for icons

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md font-serif sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">G-Blogs</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/signin" className="hover:text-gray-200">SignIn</a>
          <a href="/signup" className="hover:text-gray-200">SignUp</a>
          <a href="/about" className="hover:text-gray-200">About</a>
          <a href="/contact" className="hover:text-gray-200">Contact</a>
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
            <a href="/" className="hover:text-gray-200">Home</a>
            <a href="/signin" className="hover:text-gray-200">SignIn</a>
            <a href="/signup" className="hover:text-gray-200">SignUp</a>
            <a href="/about" className="hover:text-gray-200">About</a>
            <a href="/contact" className="hover:text-gray-200">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}
