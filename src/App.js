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
import Shop from './Pages/Shop'; // optional
import AddProduct from './Pages/AddProduct'; // optional
import TermsOfService from './Pages/TermsOfService';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Products from './Pages/Products';
import AddStock from './Pages/AddStock';
import Orders from './Pages/Orders';
import DeliveryOrders from './Pages/DeliveryOrders';
import Dashboard from './Pages/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';
import BlogDetail from './Pages/BlogDetail'; // optional

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
        <Route path="/shop" element={<Shop />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-stock" element={<AddStock />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/delivery-orders" element={<DeliveryOrders />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
