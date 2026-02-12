import React from "react";
import { FaHeartbeat, FaMoneyBillWave, FaSeedling, FaChalkboardTeacher } from "react-icons/fa";
import heroImage from "../images/blue_home.jpg"; // Replace with your actual image path
import aboutImage from "../images/about-us.jpg"; // Replace with your actual image path
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

import ClientsSection from "./Components/ClientsSection";
import StatsSection from "./Components/StatsSection";

import hero1 from "../images/blue_home.jpg";
import hero2 from "../images/white_home.jpg";
import hero3 from "../images/home_third.jpg";

const heroImages = [hero1, hero2, hero3];

function App() {

const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, 3000); // change slide every 3 seconds

  return () => clearInterval(interval);
}, []);


  // create a welcome alert when the home page loads saying  we are moving from G-Tech to NEXINDI
  // React.useEffect(() => {
  //   Swal.fire({
  //     title: 'Welcome to NEXINDI!',
  //     text: 'We are excited to announce that G-Tech is now NEXINDI. Join us as we continue to empower Africa through technology!',
  //     icon: 'info',
  //     confirmButtonText: 'Explore NEXINDI'
  //   });
  // }, []); 
  return (
      <div className="font-sans text-gray-800">
        {/* Hero Section */}
        <section
  className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 text-white transition-all duration-1000"
  style={{
    backgroundImage: `url(${heroImages[currentSlide]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>

  {/* Content */}
  <div className="relative z-10 max-w-3xl">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
      Welcome to NEXINDI Company
    </h1>
    <p className="text-lg md:text-xl mb-6">
      Empowering Africa through technology in Health, Finance, Agriculture, and Education.
    </p>
    <a href="/services">
      <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
        Get Started
      </button>
    </a>
  </div>

  {/* Slide indicators */}
  <div className="absolute bottom-6 flex gap-3 z-10">
    {heroImages.map((_, index) => (
      <div
        key={index}
        className={`w-3 h-3 rounded-full cursor-pointer ${
          index === currentSlide ? "bg-white" : "bg-white/50"
        }`}
        onClick={() => setCurrentSlide(index)}
      ></div>
    ))}
  </div>
</section>


        {/* About Section */}
        <section className="py-16 px-4 max-w-5xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
    About NEXINDI
  </h2>

  <div className="flex flex-col md:flex-row items-center gap-8">
    {/* Image */}
    <img
      src={aboutImage}
      alt="About NEXINDI"
      className="w-full md:w-1/2 max-w-lg rounded-lg shadow"
    />

    {/* Text */}
    <p className="text-lg md:w-1/2">
      NEXINDI TECH is a registered technology solutions company focused on building innovative digital products that help businesses, institutions, and individuals grow in the digital era. We specialize in web and mobile application development, custom software solutions, business systems, and digital platforms tailored to real-world needs. At NEXINDI, we combine creativity, technology, and strategy to deliver reliable, secure, and scalable solutions that empower our clients to automate processes, improve efficiency, and expand their digital presence with confidence.
    </p>
  </div>
</section>


        {/* Services Section */}
        <section className="bg-gray-100 py-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We Solve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Health", desc: "Leveraging technology to improve healthcare accessibility and efficiency.", icon: <FaHeartbeat size={40} className="text-blue-600 mb-4" /> },
              { title: "Finance", desc: "Building financial tools to empower businesses and individuals.", icon: <FaMoneyBillWave size={40} className="text-blue-600 mb-4" /> },
              { title: "Agriculture", desc: "Driving productivity through agri-tech solutions.", icon: <FaSeedling size={40} className="text-blue-600 mb-4" /> },
              { title: "Education", desc: "Enhancing learning with modern digital solutions.", icon: <FaChalkboardTeacher size={40} className="text-blue-600 mb-4" /> },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                {service.icon}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <StatsSection />

        <ClientsSection />

        {/* Call to Action */}
        <section className="py-16 px-4 text-center bg-gray-50">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
    Ready to Partner with NEXINDI?
  </h2>
  <p className="text-lg mb-8 max-w-xl mx-auto">
    Let’s build the future of Africa together through technology and innovation.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    {/* Contact Button */}
    <a href="/contact">
      <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
        Contact Us
      </button>
    </a>

    {/* Stock Button */}
    <a href="/stocks">
      <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">
        Buy NEXINDI Shares
      </button>
    </a>
  </div>
</section>

      </div>
  );
}

export default App;
