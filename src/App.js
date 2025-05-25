import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Pages/Header'; // adjust paths as needed
import Footer from './Pages/Footer'; // adjust paths as needed
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin'; // optional
import About from './Pages/About';
import Contact from './Pages/Contact';
import PostBlog from './Pages/Postblog'; // optional
import Services from './Pages/Services';
import Notifications from './Pages/Notifications'; // optional

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-blog" element={<PostBlog />} />
        <Route path="/services" element={<Services />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
