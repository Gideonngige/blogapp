import React from "react";
import { FaHeartbeat, FaMoneyBillWave, FaSeedling, FaChalkboardTeacher } from "react-icons/fa";
import heroImage from "../images/blue_home.jpg"; // Replace with your actual image path
import aboutImage from "../images/about-us.jpg"; // Replace with your actual image path
import Swal from "sweetalert2";

function App() {
  // create a welcome alert when the home page loads saying  we are moving from G-Tech to NEXINDI
  React.useEffect(() => {
    Swal.fire({
      title: 'Welcome to NEXINDI!',
      text: 'We are excited to announce that G-Tech is now NEXINDI. Join us as we continue to empower Africa through technology!',
      icon: 'info',
      confirmButtonText: 'Explore NEXINDI'
    });
  }, []); 
  return (
      <div className="font-sans text-gray-800">
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 text-white"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to NEXINDI Company</h1>
            <p className="text-lg md:text-xl mb-6">
              Empowering Africa through technology in Health, Finance, Agriculture, and Education.
            </p>
            <a href="/services"><button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
              Get Started
            </button></a>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About NEXINDI</h2>
          <img
            src={aboutImage}
            alt="About G-Tech"
            className="w-full max-w-lg mx-auto rounded-lg shadow mb-6"
          />
          <p className="text-lg max-w-2xl mx-auto">
            NEXINDI is a tech-driven startup focused on solving real-world problems across Africa by providing scalable, impactful solutions in critical sectors.
          </p>
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

        {/* Call to Action */}
        <section className="py-16 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Partner with NEXINDI?</h2>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            Let’s build the future of Africa together through technology and innovation.
          </p>
          <a href="/contact">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
            Contact Us
          </button>
          </a>
        </section>
      </div>
  );
}

export default App;
