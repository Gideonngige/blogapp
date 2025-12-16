import React from "react";

const projects = [
  {
    title: "Smart Home Automation",
    description:
      "Developed an IoT-based smart home system to control lights, temperature, and security remotely.",
    image: "/images/smart-home.jpg",
    link: "#",
  },
  {
    title: "AI Chatbot",
    description:
      "Built an AI-powered customer support chatbot for real-time assistance.",
    image: "/images/ai-chatbot.jpg",
    link: "#",
  },
  {
    title: "E-commerce Platform",
    description:
      "Created a scalable e-commerce platform with secure payments and inventory management.",
    image: "/images/ecommerce.jpg",
    link: "#",
  },
  {
    title: "Blockchain Voting System",
    description:
      "Implemented a transparent and secure voting system using blockchain technology.",
    image: "/images/blockchain.jpg",
    link: "#",
  },
];

const Projects = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore the innovative solutions G-Tech has delivered for our clients.
          </p>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
