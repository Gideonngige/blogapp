import GideonImg from "../images/gideon.jpg";
import MichaelImg from "../images/Michael.webp";


export default function About() {
  const teamMembers = [
    {
      name: "Gideon Ushindi",
      role: "Founder & Software Engineer",
      description: "Gideon is a passionate Software Engineer and technology enthusiast based in Meru, Kenya, with experience in React, React Native, Flutter, Dart, PHP, Django, Laravel, WordPress, and UI/UX. He is also a machine learning enthusiast, building intelligent, data-driven systems focused on finance, education, health, and agriculture.",
      image: GideonImg,
      coffeeLink: "https://paystack.shop/pay/1uy0h8i1yw"
    },
    {
      name: "Michael Njenga",
      role: "Software Engineer & Cybersecurity Specialist",
      description: "Michael is a dedicated software engineer and cybersecurity specialist with expertise in secure coding practices, network security, and application development. He is passionate about building robust and secure digital solutions.",
      image: MichaelImg,
      coffeeLink: "https://paystack.shop/pay/1uy0h8i1yw"
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 md:p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">About Us</h1>
        <p className="text-lg mb-6 text-gray-600">
          We are a team of passionate developers, designers, and strategists committed to building intuitive and impactful digital products. Our mission is to solve real-world problems through innovation, creativity, and technology.
        </p>

        <div className="grid gap-6 md:grid-cols-3 text-left mt-10">
          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              Empower individuals and businesses by creating efficient and scalable digital solutions.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To be a global leader in user-focused innovation and sustainable technology.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Innovation</li>
              <li>Integrity</li>
              <li>Customer Focus</li>
              <li>Teamwork</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Our Team</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full border-2 border-blue-500 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
                {/* <p className="text-blue-600 mt-2">
                  <a href={`mailto:${member.email}`} className="hover:underline">{member.email}</a>
                </p> */}
                {member.coffeeLink && member.coffeeLink !== "#" && (
                  <a
                    href={member.coffeeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-500 transition"
                  >
                    ☕ Buy me a coffee
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
