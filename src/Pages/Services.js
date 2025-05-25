import React from 'react';
import { Laptop2, Smartphone, Brush, Wrench, Users } from 'lucide-react';
import axios from 'axios';

const services = [
  {
    icon: <Laptop2 size={32} className="text-blue-600" />,
    title: 'Web Development',
    description:
      'We build responsive, fast, and user-friendly websites tailored to your business needs using modern frameworks and tools.',
    price: 'KES 40,000+',
    rawPrice: 40000, // raw price for sorting or calculations
  },
  {
    icon: <Smartphone size={32} className="text-green-600" />,
    title: 'Mobile App Development',
    description:
      'Our mobile apps are designed for performance and usability, delivering seamless experiences on both Android and iOS.',
    price: 'KES 60,000+',
    rawPrice: 60000, // raw price for sorting or calculations
  },
  {
    icon: <Brush size={32} className="text-pink-500" />,
    title: 'Graphic Design',
    description:
      'From logos to marketing materials, our creative team crafts visual content that resonates with your audience.',
    price: 'KES 5,000+',
    rawPrice: 5000, // raw price for sorting or calculations
  },
  {
    icon: <Wrench size={32} className="text-orange-500" />,
    title: 'Software Maintenance',
    description:
      'Keep your digital systems running smoothly with our ongoing maintenance, updates, and support services.',
    price: 'KES 10,000/month',
    rawPrice: 10000, // raw price for sorting or calculations
  },
  {
    icon: <Users size={32} className="text-purple-600" />,
    title: 'Consultations',
    description:
      'Get expert advice on software strategy, product development, and tech solutions tailored for your goals.',
    price: 'KES 2,000/hour',
    rawPrice: 2000, // raw price for sorting or calculations
  },
];

export default function Services() {
    const [isOrdering, setIsOrdering] = React.useState(false);

    const handleOrderServices = async (e, product_name, price) => {
      e.preventDefault();
      const quantity = 1; // Default quantity, can be modified later
    
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        alert("Please sign in to send a message.");
        return;
      }
      setIsOrdering(true);
      try {
        const response = await axios.post(
          'https://myblogbackend-phgi.onrender.com/create_order/',
          { user_id, product_name, quantity, price },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (response.status === 200) {
          console.log("Order placed successfully:", response.data);
          alert("Order placed successfully!");
        } else {
          throw new Error(response.data.message || "Failed to send message");
        }
      } catch (error) {
        console.error("Error ordering service:", error);
        alert("Failed to order service. Please try again later.");
      }
      finally {
        setIsOrdering(false);
      }
    };
    


  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
          Our Services
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We offer a wide range of technology services to help your business grow, transform, and thrive in the digital age.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-2xl p-6 shadow hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">{service.icon}</div>
                <h2 className="text-xl font-semibold mb-1 text-gray-800">{service.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                <p className="text-blue-600 font-semibold mb-4">Price: {service.price}</p>
              </div>

              <button
                onClick={(e) =>handleOrderServices(e, service.title, service.rawPrice)} // Replace with actual logic
                className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
