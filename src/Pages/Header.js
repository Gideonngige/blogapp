import React, { useState, useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
        <img
          src="/logo.png"
          alt="G-Tech Logo"
          className="h-10 w-10 rounded-full object-cover border-2 border-white"
        />
        </Link>


        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">

          <Link to="/">Home</Link>
          <Link to="/blog">Blogs</Link>
          <Link to="/post-blog">Post Blog</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/services">Services</Link>
          <Link to='/our-projects'>Our Projects</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/notifications">Notifications</Link>

          {user ? (
            <Link to="/profile">
              <img
                src={user.profile_image || "/default-avatar.png"}
                className="w-10 h-10 rounded-full border-2 object-cover"
                alt="profile"
              />
            </Link>
          ) : (
            <>
              <Link to="/signin">Signin</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)}>Blogs</Link>
            <Link to="/post-blog" onClick={() => setIsOpen(false)}>Post Blog</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to='/our-projects' onClick={() => setIsOpen(false)}>Our Projects</Link>
            <Link to="/orders" onClick={() => setIsOpen(false)}>My Orders</Link>
            <Link to="/notifications" onClick={() => setIsOpen(false)}>Notifications</Link>

            {user ? (
              <div className="flex items-center space-x-3 mt-3">
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                <img
                  src={user.profile_image || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full border-2 object-cover"
                />
                </Link>
                <span>{user.name}</span>
              </div>
            ) : (
              <>
                <Link to="/signin" onClick={() => setIsOpen(false)}>Signin</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
